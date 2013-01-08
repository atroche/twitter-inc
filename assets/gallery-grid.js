/**
* Gallery Grid
* @module squarespace-gallery-grid
*/
Y.use('squarespace-gallery', function(Y) {
  
  Y.namespace('Squarespace');

  Y.augment(Y.Lang, Class.create({
    capitalize: function(text){
     return text.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); } );
    }
  }));

  Y.Squarespace.GalleryDesigns.grid = Y.Squarespace.GalleryDesigns.off.extend({

    options: {
      layoutMode: 'autoColumns',

      changeOnEvent: 'click',           // this will fire a global "changeIndex" event on all linkedGalleries.

      masonry: {
        minColumnWidth: 500,
        columnWidth: 500,
        gutterWidth: 30
      },

      autoColumns: {
        minColumnWidth: 400,
        gutterWidth: 30
      },
      
      cellsByRow: {
        rowHeight: 800,
        columnWidth: 800
      },
      
      cellsByColumn: {
        columnWidth: 400,
        rowHeight: 400
      }
    },

    setup: function() {
      
      // this.options.layoutMode = 'fitRows'; // masonry, fitRows, cellsByRow, straightDown, masonryHorizontal, fitColumns, cellsByColumn, straightAcross
      this.element = this.gallery.elems.container;
      this.$filteredAtoms = this.gallery.elems.slides;
      this.offset = { left: this.options[this.options.layoutMode].gutterWidth || 20, top: this.options[this.options.layoutMode].gutterWidth || 20 };  
      this.getPositionStyles = this._positionAbs;
      this.styleQueue = [];

      this.reLayout( this.gallery.elems.slides );

      // bind events for loaded
      this.gallery.elems.slides.each(function(slide) {
        if (slide.loader) {
          slide.on('loaded', function() {
            this.reLayout(this.gallery.elems.slides);
          }, this)
        }
      }, this);
      
      this.events.push(
        
        Y.on('resize', function() {
          if (this.gallery.elems.container._node) {
            this.resize();
          }
        }, Y.config.win, this)

      );

      // Check if it's position absolute or position relative, and set accordingly
      var elementPosition = this.element.getStyle('position');
      if( elementPosition != 'relative' || elementPosition != 'absolute' ) {
        this.element.setStyle('position', 'relative');
      }

      // If there is a event listener to be binded.
      if( this.options.changeOnEvent ) {

        this.gallery.elems.slides.each(function(slide,index) {
          slide.on(this.options.changeOnEvent, function() {
            this.gallery.fire('changeIndex', index);
          }, this);
        }, this);

      }

    },
    
// ====================== Layout Helpers ======================

    _translate : function( x, y ) {
      return { translate : [ x, y ] };
    },
    
    _positionAbs : function( x, y ) {
      return { left: x, top: y };
    },

    _pushPosition : function( $elem, x, y ) {
      // x += this.offset.left;
      // y += this.offset.top;
      var position = this.getPositionStyles( x, y );
      this.styleQueue.push({ $el: $elem, style: position });
      if ( this.options.itemPositionDataEnabled ) {
        $elem.data('isotope-item-position', {x: x, y: y} );
      }
    },


    // ====================== General Layout ======================

    // used on collection of atoms (should be filtered, and sorted before )
    // accepts atoms-to-be-laid-out to start with
    layout : function( $elems, callback ) {

      var layoutMode = this.options.layoutMode;

      // layout logic
      this[ '_' +  layoutMode + 'Layout' ]( $elems );
      
      // set the size of the container
      if ( this.options.resizesContainer ) {
        var containerStyle = this[ '_' +  layoutMode + 'GetContainerSize' ]();
        this.styleQueue.push({ $el: this.element, style: containerStyle });
      }

      this._processStyleQueue();

      // provide $elems as context for the callback
      // if ( callback ) {
      //   callback.call( $elems );
      // }
      
      this.isLaidOut = true;
    },
    
    _processStyleQueue : function() {
      // are we animating the layout arrangement?
      // use plugin-ish syntax for css or animate
      var styleFn = !this.isLaidOut ? 'setStyles' : (
            this.isUsingJQueryAnimation ? 'animate' : 'css'
          ),
          animOpts = this.options.animationOptions,
          _isInsertingAnimated = this._isInserting && this.isUsingJQueryAnimation,
          objStyleFn;
      
      // process styleQueue
      Y.Array.each( this.styleQueue, function( obj, i ) {
        // objStyleFn = _isInsertingAnimated && obj.$el.hasClass('no-transition') ? 'setStyles' : styleFn;
        objStyleFn = 'setStyles';
        obj.$el[ objStyleFn ]( obj.style, animOpts );
      });

      // clear out queue for next time
      this.styleQueue = [];
    },
    
    
    resize : function() {
      if ( this[ '_' + this.options.layoutMode + 'ResizeChanged' ]() ) {
        this.reLayout();
      }
    },
    
    
    reLayout : function( callback ) {
      
      this[ '_' +  this.options.layoutMode + 'Reset' ]();
      this.layout( this.$filteredAtoms, callback );
      
    },
    
    // ====================== Convenience methods ======================
    
    // ====================== Adding items ======================
    
    // adds a jQuery object of items to a isotope container
    addItems : function( $content, callback ) {
      var $newAtoms = this._getAtoms( $content );
      // add new atoms to atoms pools
      // FIXME : this breaks shuffle order and returns to original order
      this.$allAtoms = this.$allAtoms.add( $newAtoms );

      if ( callback ) {
        callback( $newAtoms );
      }
    },
    
    // convienence method for adding elements properly to any layout
    // positions items, hides them, then animates them back in <--- very sezzy
    insert : function( $content, callback ) {
      // position items
      this.element.append( $content );
      
      var instance = this;
      this.addItems( $content, function( $newAtoms ) {
        var $newFilteredAtoms = instance._filter( $newAtoms, true );
        instance._addHideAppended( $newFilteredAtoms );
        instance._sort();
        instance.reLayout();
        instance._revealAppended( $newFilteredAtoms, callback );
      });
      
    },
    
    // convienence method for working with Infinite Scroll
    appended : function( $content, callback ) {
      var instance = this;
      this.addItems( $content, function( $newAtoms ) {
        instance._addHideAppended( $newAtoms );
        instance.layout( $newAtoms );
        instance._revealAppended( $newAtoms, callback );
      });
    },
    
    // adds new atoms, then hides them before positioning
    _addHideAppended : function( $newAtoms ) {
      this.$filteredAtoms = this.$filteredAtoms.add( $newAtoms );
      $newAtoms.addClass('no-transition');
      
      this._isInserting = true;
      
      // apply hidden styles
      this.styleQueue.push({ $el: $newAtoms, style: this.options.hiddenStyle });
    },
    
    // sets visible style on new atoms
    _revealAppended : function( $newAtoms, callback ) {
      var instance = this;
      // apply visible style after a sec
      setTimeout( function() {
        // enable animation
        $newAtoms.removeClass('no-transition');
        // reveal newly inserted filtered elements
        instance.styleQueue.push({ $el: $newAtoms, style: instance.options.visibleStyle });
        instance._processStyleQueue();
        delete instance._isInserting;
        if ( callback ) {
          callback( $newAtoms );
        }
      }, 10 );
    },
    
    // gathers all atoms
    reloadItems : function() {
      this.$allAtoms = this._getAtoms( this.element.children() );
    },
    
    // removes elements from Isotope widget
    remove : function( $content ) {

      this.$allAtoms = this.$allAtoms.not( $content );
      this.$filteredAtoms = this.$filteredAtoms.not( $content );

      $content.remove();
      
    },
    
    shuffle : function() {
      this.updateSortData( this.$allAtoms );
      this.options.sortBy = 'random';
      this._sort();
      this.reLayout();
    },
    
    // destroys widget, returns elements and container back (close) to original style
    destroy : function() {

      var usingTransforms = this.usingTransforms;

      this.$allAtoms
        .removeClass( this.options.hiddenClass + ' ' + this.options.itemClass )
        .each(function(){
          this.style.position = null;
          this.style.top = null;
          this.style.left = null;
          this.style.opacity = null;
          if ( usingTransforms ) {
            this.style[ transformProp ] = null;
          }
        });
      
      // re-apply saved container styles
      var elemStyle = this.element[0].style;
      for ( var i=0, len = isoContainerStyles.length; i < len; i++ ) {
        var prop = isoContainerStyles[i];
        elemStyle[ prop ] = this.originalStyle[ prop ];
      }
      
      this.element
        .unbind('.isotope')
        .removeClass( this.options.containerClass )
        .removeData('isotope');
      
      $(window).unbind('.isotope');

    },
    
    
    // ====================== LAYOUTS ======================
    
    // calculates number of rows or columns
    // requires columnWidth or rowHeight to be set on namespaced object
    // i.e. this.masonry.columnWidth = 200
    _getSegments : function( isRows ) {
      
      var namespace = this.options.layoutMode,
          measure  = isRows ? 'rowHeight' : 'columnWidth',
          size     = isRows ? 'height' : 'width',
          segmentsName = isRows ? 'rows' : 'cols',
          containerSize = this.element[ size ](),
          segments,
                    // i.e. options.masonry && options.masonry.columnWidth
          segmentSize = this.options[ namespace ] && this.options[ namespace ][ measure ] ||
                    // or use the size of the first item, i.e. outerWidth
                    this.$filteredAtoms.item(0)[ 'outer' + Y.Lang.capitalize(size) ](true) ||
                    // if there's no items, use size of container
                    containerSize;
      
      segments = Math.floor( containerSize / segmentSize );
      segments = Math.max( segments, 1 );

      // i.e. this.masonry.cols = ....
      this[ namespace ][ segmentsName ] = segments;
      // i.e. this.masonry.columnWidth = ...
      this[ namespace ][ measure ] = segmentSize;
      
    },
    
    _checkIfSegmentsChanged : function( isRows ) {
      var namespace = this.options.layoutMode,
          segmentsName = isRows ? 'rows' : 'cols',
          prevSegments = this[ namespace ][ segmentsName ];
      // update cols/rows
      this._getSegments( isRows );
      // return if updated cols/rows is not equal to previous
      return ( this[ namespace ][ segmentsName ] !== prevSegments );
    },

    // ====================== autoColumns ======================
  
    _autoColumnsReset : function() {
      // layout-specific props
      this.autoColumns = {};
      
      // Columns that we can safely stuff in here.
      var columns;
      if( this.options.autoColumns.maxColumnWidth ) {
        columns = Math.ceil( this.element.width() / this.options.autoColumns.maxColumnWidth );
      } else {
        columns = Math.floor( this.element.width() / this.options.autoColumns.minColumnWidth );
      }

      // evaluate the amount of space the gutter will take up
      var totalGutterWidth = 0;
      if (columns > 1) {
        totalGutterWidth = ( columns - 1 ) * this.options.autoColumns.gutterWidth;
      }

      var columnWidth = Math.floor((this.element.width() - totalGutterWidth) / columns);

      console.log('colWidth', columnWidth);
      
      // FIXME shouldn't have to call this again
      // this._getSegments();
      this.autoColumns.cols = columns;
      this.autoColumns.columnWidth = columnWidth;
      this.autoColumns.gutterWidth = this.options.autoColumns.gutterWidth;
      
      var i = this.autoColumns.cols;
      this.autoColumns.colYs = [];
      while (i--) {
        this.autoColumns.colYs.push( 0 );
      }
      
    },
  
    _autoColumnsLayout : function( $elems ) {
      var instance = this,
          props = instance.autoColumns;

      $elems.each(function($element) {
        $element.setStyle('width', props.columnWidth);
        $element.setStyle('marginBottom', props.gutterWidth + 'px');

        if( $element.test('img') ) {
          $element.fire('refresh');
        } else {
          $element.one('img').refresh();
        }

        $element.setStyles({
          height: this.gallery.getSlideDimension(this.gallery.getSlides().indexOf($element), 'height')
        });

        // $element.setStyle('height', null);
        // $element.setStyle('height', $element.get('offsetHeight'));

        // $element.one('img').setStyles({
        //   width: null,
        //   height: null
        // });

      }, this);
      
      $elems.each(function($this){
            //how many columns does this brick span
        var colSpan = Math.ceil( $this.outerWidth(true) / props.columnWidth );
        colSpan = Math.min( colSpan, props.cols );
        
        // $this.setStyle('width', columnWidth + 'px');

        if ( colSpan === 1 ) {
          // if brick spans only one column, just like singleMode
          instance._autoColumnsPlaceBrick( $this, props.colYs );
        } else {
          // brick spans more than one column
          // how many different places could this brick fit horizontally
          var groupCount = props.cols + 1 - colSpan,
              groupY = [],
              groupColY,
              i;

          // for each group potential horizontal position
          for ( i=0; i < groupCount; i++ ) {
            // make an array of colY values for that one group
            groupColY = props.colYs.slice( i, i+colSpan );
            // and get the max value of the array
            groupY[i] = Math.max.apply( Math, groupColY );
          }
        
          instance._autoColumnsPlaceBrick( $this, groupY );
        }
      });
      
      this.gallery.elems.container.setStyle( 'height', this._autoColumnsGetContainerSize().height );
    },
    
    // worker method that places brick in the columnSet
    //   with the the minY
    _autoColumnsPlaceBrick : function( $brick, setY ) {
      // get the minimum Y value from the columns
      var minimumY = Math.min.apply( Math, setY ),
          shortCol = 0;

      // Find index of short column, the first from the left
      for (var i=0, len = setY.length; i < len; i++) {
        if ( setY[i] === minimumY ) {
          shortCol = i;
          break;
        }
      }
    
      // position the brick
      var x = (this.autoColumns.columnWidth * shortCol) + (shortCol > 0 ? (this.autoColumns.gutterWidth * shortCol) : 0),
          y = minimumY;
      this._pushPosition( $brick, x, y );

      // apply setHeight to necessary columns
      var setHeight = minimumY + $brick.outerHeight(true),
          setSpan = this.autoColumns.cols + 1 - len;
      for ( i=0; i < setSpan; i++ ) {
        this.autoColumns.colYs[ shortCol + i ] = setHeight;
      }

    },
    
    _autoColumnsGetContainerSize : function() {
      var containerHeight = Math.max.apply( Math, this.autoColumns.colYs );
      return { height: containerHeight };
    },
  
    _autoColumnsResizeChanged : function() {
      // return this._checkIfSegmentsChanged();
      return true;
    },
  
    // ====================== Masonry ======================
  
    _masonryReset : function() {
      // layout-specific props
      this.masonry = {};
      
      // Columns that we can safely stuff in here.
      var columns = Math.ceil( this.element.width() / this.options.masonry.minColumnWidth );
      var columnWidth = this.element.width() / columns;
      
      // FIXME shouldn't have to call this again
      // this._getSegments();
      this.masonry.cols = columns;
      this.masonry.columnWidth = columnWidth;
      this.masonry.gutterWidth = this.options.masonry.gutterWidth;
      
      var i = this.masonry.cols;
      this.masonry.colYs = [];
      while (i--) {
        this.masonry.colYs.push( 0 );
      }
      
    },
  
    _masonryLayout : function( $elems ) {
      var instance = this,
          props = instance.masonry;

      $elems.each(function($element) {
        $element.setStyle('width', props.columnWidth - props.gutterWidth);
        $element.setStyle('paddingBottom', props.gutterWidth + 'px');

        if( $element.test('img') ) {
          $element.fire('refresh');
        } else {
          $element.one('img').refresh();
        }
      });
      
      $elems.each(function($this){
            //how many columns does this brick span
        var colSpan = Math.ceil( $this.outerWidth(true) / props.columnWidth );
        colSpan = Math.min( colSpan, props.cols );
        
        // $this.setStyle('width', columnWidth + 'px');

        if ( colSpan === 1 ) {
          // if brick spans only one column, just like singleMode
          instance._masonryPlaceBrick( $this, props.colYs );
        } else {
          // brick spans more than one column
          // how many different places could this brick fit horizontally
          var groupCount = props.cols + 1 - colSpan,
              groupY = [],
              groupColY,
              i;

          // for each group potential horizontal position
          for ( i=0; i < groupCount; i++ ) {
            // make an array of colY values for that one group
            groupColY = props.colYs.slice( i, i+colSpan );
            // and get the max value of the array
            groupY[i] = Math.max.apply( Math, groupColY );
          }
        
          instance._masonryPlaceBrick( $this, groupY );
        }
      });
    },
    
    // worker method that places brick in the columnSet
    //   with the the minY
    _masonryPlaceBrick : function( $brick, setY ) {
      // get the minimum Y value from the columns
      var minimumY = Math.min.apply( Math, setY ),
          shortCol = 0;

      // Find index of short column, the first from the left
      for (var i=0, len = setY.length; i < len; i++) {
        if ( setY[i] === minimumY ) {
          shortCol = i;
          break;
        }
      }
    
      // position the brick
      var x = this.masonry.columnWidth * shortCol,
          y = minimumY;
      this._pushPosition( $brick, x, y );

      // apply setHeight to necessary columns
      var setHeight = minimumY + $brick.outerHeight(true),
          setSpan = this.masonry.cols + 1 - len;
      for ( i=0; i < setSpan; i++ ) {
        this.masonry.colYs[ shortCol + i ] = setHeight;
      }

    },
    
    _masonryGetContainerSize : function() {
      var containerHeight = Math.max.apply( Math, this.masonry.colYs );
      return { height: containerHeight };
    },
  
    _masonryResizeChanged : function() {
      // return this._checkIfSegmentsChanged();
      return true;
    },
  
    // ====================== fitRows ======================
    
    _fitRowsReset : function() {
      this.fitRows = {
        x : 0,
        y : 0,
        height : 0
      };
    },
  
    _fitRowsLayout : function( $elems ) {
      var instance = this,
          containerWidth = this.element.width(),
          props = this.fitRows;
      
      $elems.each( function($this) {
        var atomW = $this.outerWidth(true),
            atomH = $this.outerHeight(true);
      
        if ( props.x !== 0 && atomW + props.x > containerWidth ) {
          // if this element cannot fit in the current row
          props.x = 0;
          props.y = props.height;
        } 
      
        // position the atom
        instance._pushPosition( $this, props.x, props.y );
  
        props.height = Math.max( props.y + atomH, props.height );
        props.x += atomW;
  
      });
    },
  
    _fitRowsGetContainerSize : function () {
      return { height : this.fitRows.height };
    },
  
    _fitRowsResizeChanged : function() {
      return true;
    },
  

    // ====================== cellsByRow ======================
  
    _cellsByRowReset : function() {
      this.cellsByRow = {
        index : 0
      };
      // get this.cellsByRow.columnWidth
      this._getSegments();
      // get this.cellsByRow.rowHeight
      this._getSegments(true);
    },

    _cellsByRowLayout : function( $elems ) {
      var instance = this,
          props = this.cellsByRow;
      $elems.each( function($this){
        var col = props.index % props.cols,
            row = parseInt( props.index / props.cols, 10),
            x = ( col + 0.5 ) * props.columnWidth - $this.outerWidth(true) / 2,
            y = ( row + 0.5 ) * props.rowHeight - $this.outerHeight(true) / 2;
        instance._pushPosition( $this, x, y );
        props.index ++;
      });
    },

    _cellsByRowGetContainerSize : function() {
      return { height : Math.ceil( this.$filteredAtoms.length / this.cellsByRow.cols ) * this.cellsByRow.rowHeight + this.offset.top };
    },

    _cellsByRowResizeChanged : function() {
      return this._checkIfSegmentsChanged();
    },
  
  
    // ====================== straightDown ======================
  
    _straightDownReset : function() {
      this.straightDown = {
        y : 0
      };
    },

    _straightDownLayout : function( $elems ) {
      var instance = this;
      $elems.each( function($this){
        instance._pushPosition( $this, 0, instance.straightDown.y );
        instance.straightDown.y += $this.outerHeight(true);
      });
    },

    _straightDownGetContainerSize : function() {
      return { height : this.straightDown.y };
    },

    _straightDownResizeChanged : function() {
      return true;
    },


    // ====================== masonryHorizontal ======================
    
    _masonryHorizontalReset : function() {
      // layout-specific props
      this.masonryHorizontal = {};
      // FIXME shouldn't have to call this again
      this._getSegments( true );
      var i = this.masonryHorizontal.rows;
      this.masonryHorizontal.rowXs = [];
      while (i--) {
        this.masonryHorizontal.rowXs.push( 0 );
      }
    },
  
    _masonryHorizontalLayout : function( $elems ) {
      var instance = this,
          props = instance.masonryHorizontal;
      $elems.each(function($this){
        //how many rows does this brick span
        var rowSpan = Math.ceil( $this.outerHeight(true) / props.rowHeight );
        rowSpan = Math.min( rowSpan, props.rows );

        if ( rowSpan === 1 ) {
          // if brick spans only one column, just like singleMode
          instance._masonryHorizontalPlaceBrick( $this, props.rowXs );
        } else {
          // brick spans more than one row
          // how many different places could this brick fit horizontally
          var groupCount = props.rows + 1 - rowSpan,
              groupX = [],
              groupRowX, i;

          // for each group potential horizontal position
          for ( i=0; i < groupCount; i++ ) {
            // make an array of colY values for that one group
            groupRowX = props.rowXs.slice( i, i+rowSpan );
            // and get the max value of the array
            groupX[i] = Math.max.apply( Math, groupRowX );
          }

          instance._masonryHorizontalPlaceBrick( $this, groupX );
        }
      });
    },
    
    _masonryHorizontalPlaceBrick : function( $brick, setX ) {
      // get the minimum Y value from the columns
      var minimumX  = Math.min.apply( Math, setX ),
          smallRow  = 0;
      // Find index of smallest row, the first from the top
      for (var i=0, len = setX.length; i < len; i++) {
        if ( setX[i] === minimumX ) {
          smallRow = i;
          break;
        }
      }

      // position the brick
      var x = minimumX,
          y = this.masonryHorizontal.rowHeight * smallRow;
      this._pushPosition( $brick, x, y );

      // apply setHeight to necessary columns
      var setWidth = minimumX + $brick.outerWidth(true),
          setSpan = this.masonryHorizontal.rows + 1 - len;
      for ( i=0; i < setSpan; i++ ) {
        this.masonryHorizontal.rowXs[ smallRow + i ] = setWidth;
      }
    },

    _masonryHorizontalGetContainerSize : function() {
      var containerWidth = Math.max.apply( Math, this.masonryHorizontal.rowXs );
      return { width: containerWidth };
    },
    
    _masonryHorizontalResizeChanged : function() {
      return this._checkIfSegmentsChanged(true);
    },


    // ====================== fitColumns ======================
  
    _fitColumnsReset : function() {
      this.fitColumns = {
        x : 0,
        y : 0,
        width : 0
      };
    },
    
    _fitColumnsLayout : function( $elems ) {
      var instance = this,
          containerHeight = this.element.height(),
          props = this.fitColumns;
      $elems.each( function($this) {
        var atomW = $this.outerWidth(true),
            atomH = $this.outerHeight(true);

        if ( props.y !== 0 && atomH + props.y > containerHeight ) {
          // if this element cannot fit in the current column
          props.x = props.width;
          props.y = 0;
        } 

        // position the atom
        instance._pushPosition( $this, props.x, props.y );

        props.width = Math.max( props.x + atomW, props.width );
        props.y += atomH;

      });
    },
    
    _fitColumnsGetContainerSize : function () {
      return { width : this.fitColumns.width };
    },
    
    _fitColumnsResizeChanged : function() {
      return true;
    },
    

  
    // ====================== cellsByColumn ======================
  
    _cellsByColumnReset : function() {
      this.cellsByColumn = {
        index : 0
      };
      // get this.cellsByColumn.columnWidth
      this._getSegments();
      // get this.cellsByColumn.rowHeight
      this._getSegments(true);
    },

    _cellsByColumnLayout : function( $elems ) {
      var instance = this,
          props = this.cellsByColumn;
      $elems.each( function($this){
        var col = parseInt( props.index / props.rows, 10 ),
            row = props.index % props.rows,
            x = ( col + 0.5 )  * props.columnWidth - $this.outerWidth(true) / 2,
            y = ( row + 0.5 ) * props.rowHeight - $this.outerHeight(true) / 2;
        instance._pushPosition( $this, x, y );
        props.index ++;
      });
    },

    _cellsByColumnGetContainerSize : function() {
      return { width : Math.ceil( this.$filteredAtoms.length / this.cellsByColumn.rows ) * this.cellsByColumn.columnWidth };
    },

    _cellsByColumnResizeChanged : function() {
      return this._checkIfSegmentsChanged(true);
    },
    
    // ====================== straightAcross ======================

    _straightAcrossReset : function() {
      this.straightAcross = {
        x : 0
      };
    },

    _straightAcrossLayout : function( $elems ) {
      var instance = this;
      $elems.each( function( $this ){
        instance._pushPosition( $this, instance.straightAcross.x, 0 );
        instance.straightAcross.x += $this.outerWidth(true);
      });
    },

    _straightAcrossGetContainerSize : function() {
      return { width : this.straightAcross.x };
    },

    _straightAcrossResizeChanged : function() {
      return true;
    }    
    
  });

});