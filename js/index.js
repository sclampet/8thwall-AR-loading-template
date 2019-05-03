

let shadowRoot
let container
let shutterButton
let imageContainer
let image
let imageBackground
let savePrompt
let holdFeedback
let flash

const setRoot = root => {
  shadowRoot = root
  container = shadowRoot.getElementById('photoModeContainer')
  shutterButton = shadowRoot.getElementById('photoModeShutterButton')
  imageContainer = shadowRoot.getElementById('photoModeImageContainer')
  image = shadowRoot.getElementById('photoModeImage')
  imageBackground = shadowRoot.getElementById('photoModeImageBackground')
  savePrompt = shadowRoot.getElementById('photoModeSavePrompt')
  holdFeedback = shadowRoot.getElementById('photoModeHoldFeedback')
  flash = shadowRoot.getElementById('photoModeFlash')
}

const name = 'photo-mode'
const component = {
  schema: {
    state: { default: 'photoModeCollapsed' },
  },
  init: function() {
    const scene = this.el.sceneEl

    let resetSavePromptTimeout = null

    const savePromptText = 'Touch and hold to save\xa0💾'

    const startHold = event => {
      holdFeedback.classList.add('holding-image')
      holdFeedback.style.left = event.touches[0].clientX + 'px'
      holdFeedback.style.top = event.touches[0].clientY + 'px'
    }

    const endHold = () => {
      holdFeedback.classList.remove('holding-image')
    }

    const setState = newState => {
      endHold()
      if (state) {
        container.classList.remove(state)
      }
      container.classList.add(newState)
      state = newState
      scene.emit(newState, '')
    }

    let state = ''
    setState(this.data.state)

    image.addEventListener('touchstart', startHold)
    image.addEventListener('touchend',  endHold)
    image.addEventListener('touchcancel', endHold)

    // Prevents force touching the image
    shadowRoot.addEventListener('touchforcechange', event => {
      const force = event.changedTouches[0].force
      const id = event.changedTouches[0].target.id
      if (id === 'photoModeImage' && force > 0.14) {
        savePrompt.textContent = "Too hard! Try pressing more lightly\xa0☁️"
        clearTimeout(resetSavePromptTimeout)
        resetSavePromptTimeout = setTimeout(() => savePrompt.textContent = savePromptText, 1000)
        endHold()
        event.preventDefault()
      }
    })

    shutterButton.addEventListener('click', () => {
      image.src = ""
      scene.emit('screenshotRequest','')
      shutterButton.classList.add('photo-mode-shutter-click')
      setTimeout(() => shutterButton.classList.remove('photo-mode-shutter-click'), 200)
      flash.classList.remove('hidden')
    })

    let waitingOnImage = false
    image.onload = () => {
      if (!waitingOnImage) {
        return
      }
      waitingOnImage = false
      this.canvas = this.canvas || document.createElement('canvas')
      this.ctx = this.ctx || this.canvas.getContext('2d')

      this.canvas.width = image.naturalWidth
      this.canvas.height = image.naturalHeight
      this.ctx.drawImage(image, 0 , 0)

      const overlayImage = document.getElementById('logo')
      const imageWidth = this.canvas.width * 0.4
      const imageHeight = imageWidth * overlayImage.naturalHeight / overlayImage.naturalWidth
      this.ctx.drawImage(overlayImage, this.canvas.width / 2 - imageWidth / 2 , 10, imageWidth, imageHeight)

      this.ctx.font = `${Math.min(image.naturalWidth,image.naturalHeight) * 0.05}px sans-serif`
      this.ctx.textAlign = 'end'
      this.ctx.textBaseline = 'bottom'
      this.ctx.fillStyle = 'white'
      this.ctx.fillText('© 2019 8th Wall', this.canvas.width - 10, this.canvas.height - 10)

      image.src = this.canvas.toDataURL('image/jpeg')
      savePrompt.textContent = savePromptText
      setState('photoModeSave')
      flash.style.opacity = '0'
      setTimeout(() => {
        flash.classList.add('hidden')
        flash.style.opacity = '1'
      }, 500)
    }

    scene.addEventListener('screenshotReady', event => {
      waitingOnImage = true
      image.src = 'data:image/jpeg;base64,' + event.detail

    })

    scene.addEventListener('swipeleft', () => {
      if (state === 'photoModeSave') {
        setState('photoModeCapture')
      }
    })

    scene.addEventListener('showphotomode', () => {
      if (state === 'photoModeCollapsed') {
        setState('photoModeCapture')
      }
    })

    scene.addEventListener('hidephotomode', () => {
      setState('photoModeCollapsed')
    })

    imageBackground.addEventListener('click', () => {
      setState('photoModeCapture')
    })
  },
}

class PhotoMode extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }
  connectedCallback() {
    this.shadowRoot.innerHTML = `<style>${style}</style>${html}`
    setRoot(this.shadowRoot)
  }
}

function register() {
  AFRAME.registerComponent(name, component)
  customElements.define('photo-mode', PhotoMode)
}

