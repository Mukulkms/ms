class BigCircle {
    constructor() {
      this.root = document.body
      this.cursor = document.querySelector(".curzr")
      this.circle = document.querySelector(".curzr .circle")
      this.dot = document.querySelector(".curzr .dot")
  
      this.pointerX = 0
      this.pointerY = 0
      this.cursorSize = 20
  
      this.circleStyle = {
        boxSizing: 'border-box',
        position: 'fixed',
        top: `${ this.cursorSize / -2 }px`,
        left: `${ this.cursorSize / -2 }px`,
        zIndex: '2147483647',
        width: `${ this.cursorSize }px`,
        height: `${ this.cursorSize }px`,
        backgroundColor: '#fff0',
        borderRadius: '50%',
        transition: '500ms, transform 100ms',
        userSelect: 'none',
        pointerEvents: 'none'
      }
  
      this.dotStyle = {
        boxSizing: 'border-box',
        position: 'fixed',
        top: `${ this.cursorSize / 500 }px`,
        left: `${ this.cursorSize / 0 }px`,
        zIndex: '2147483647',
        width: '8px',
        height: '8px',
        backgroundColor: '#fff0',
        borderRadius: '50%',
        userSelect: 'none',
        pointerEvents: 'none',
        transition: '250ms, transform 75ms'
      }
  
      if (CSS.supports("backdrop-filter", "invert(1) grayscale(1)")) {
        this.circleStyle.backdropFilter = 'invert(1) grayscale(1)'
        this.circleStyle.backgroundColor = '#fff0'
        this.dotStyle.backdropFilter = 'invert(1) grayscale(1)'
        this.dotStyle.backgroundColor = '#fff0'
      } else {
        this.circleStyle.backgroundColor = '#fff'
        this.circleStyle.opacity = '0.75'
        this.dotStyle.backgroundColor = '#fff'
        this.dotStyle.opacity = '0.75'
      }
  
      this.init(this.circle, this.circleStyle)
      this.init(this.dot, this.dotStyle)
    }
  
    init(el, style) {
      Object.assign(el.style, style)
      this.cursor.removeAttribute("hidden")
      
    }
  
    move(event) {
      this.pointerX = event.pageX
      this.pointerY = event.pageY + this.root.getBoundingClientRect().y
    
      this.circle.style.transform = `translate3d(${this.pointerX}px, ${this.pointerY}px, 0)`
      this.dot.style.transform = `translate3d(calc(-50% + ${this.pointerX}px), calc(-50% + ${this.pointerY}px), 0)`
  
      if (event.target.localName === 'button' || 
          event.target.localName === 'a' || 
          event.target.onclick !== null ||
          event.target.localName ===('curzr-hover')) {
        this.hover()
      }
    }
  
    hover() {
      this.circle.style.transform += ` scale(1.5)`
    }
  
    click() {
      this.circle.style.transform += ` scale(0.75)`
      setTimeout(() => {
        this.circle.style.transform = this.circle.style.transform.replace(` scale(0.75)`, '')
      }, 35)
    }
  
    remove() {
      this.circle.remove()
      this.dot.remove()
    }
  }
  
  (() => {
    const cursor = new BigCircle()
    if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      document.onmousemove = function (event) {
        cursor.move(event)
      }
      document.onclick = function () {
        cursor.click()
      }
    } else {
      cursor.remove()
    }
    
  })()
  
  
  