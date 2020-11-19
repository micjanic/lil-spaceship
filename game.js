;(function () {
    const canvas = document.getElementById('game')
    const context = canvas.getContext('2d')

    const SPACESHIP_SIZE = { width: 20, height: 30 }
    const SPACESHIP_POSITION = { x: 200, y: 200 }

    const GRAVITY = 0
    const THRUST = 5

    class Spaceship {
        constructor(size, position) {
            this.color = 'white'
            this.size = size
            this.position = position
            this.angle = 0
            this.engineOn = false
            this.rotatingLeft = false
            this.rotatingRight = false
            this.velocity = {
                x: 0,
                y: 0,
            }
        }

        draw() {
            const triangleCenterX = this.position.x + 0.5 * this.size.width
            const triangleCenterY = this.position.y + 0.5 * this.size.height

            context.save()
            context.translate(triangleCenterX, triangleCenterY)
            context.rotate(this.angle)
            context.lineWidth = 1
            context.beginPath()

            context.moveTo(0, -this.size.height / 2)
            context.lineTo(-this.size.width / 2, this.size.height / 2)
            context.lineTo(this.size.width / 2, this.size.height / 2)
            context.closePath()

            context.strokeStyle = '#fff'
            context.stroke()
            context.restore()
            //triangle
        }

        moveSpaceShip() {
            //Angle has to be in radians
            const degToRad = Math.PI / 180
            //change the position based on velocity
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y
            //turning
            if (this.rotatingLeft) this.angle -= degToRad
            if (this.rotatingRight) this.angle += degToRad
            //acceleration
            if (this.engineOn) {
                this.velocity.x += (THRUST / 100) * Math.sin(this.angle)
                this.velocity.y -= (THRUST / 100) * Math.cos(this.angle)
            }
            //update velocity depending on gravity
            this.velocity.y += GRAVITY / 100
        }
    }

    const spaceShip = new Spaceship(SPACESHIP_SIZE, SPACESHIP_POSITION)

    function handleKeyInput(event) {
        const { keyCode, type } = event
        const isKeyDown = type === 'keydown' ? true : false

        if (keyCode === 37) spaceShip.rotatingLeft = isKeyDown
        if (keyCode === 39) spaceShip.rotatingRight = isKeyDown
        if (keyCode === 38) spaceShip.engineOn = isKeyDown
    }

    function draw() {
        console.log('Drawing')
        //clear canvas
        context.fillStyle = '#000'
        context.fillRect(0, 0, canvas.width, canvas.height)
        spaceShip.moveSpaceShip()
        spaceShip.draw()

        requestAnimationFrame(draw)
    }

    //event listeners
    document.addEventListener('keydown', handleKeyInput)
    document.addEventListener('keyup', handleKeyInput)
    //start game
    draw()
})()
