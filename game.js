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
            this.pew = false

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

            //fire fricken laser beams
            if (this.pew) {
                this.pew = false
            }

            //flame for engine
            if (this.engineOn) {
                const fireYPos = this.size.height / 2 + 5
                const fireXPos = this.size.width * 0.25
                context.beginPath()
                context.moveTo(-fireXPos, fireYPos)
                context.lineTo(fireXPos, fireYPos)
                context.lineTo(0, fireYPos + Math.random() * 50)
                context.lineTo(-fireXPos, fireYPos)
                context.closePath()
                context.fillStyle = 'orange'
                context.fill()
            }
            context.restore()
            //triangle
        }

        moveSpaceShip() {
            //Angle has to be in radians
            const degToRad = Math.PI / 180
            //change the position based on velocity
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y
            //modulus will move spaceship to other side of screen
            this.position.x = (canvas.width + this.position.x) % canvas.width
            this.position.y = (canvas.height + this.position.y) % canvas.height

            //turning
            if (this.rotatingLeft) this.angle -= degToRad
            if (this.rotatingRight) this.angle += degToRad

            //acceleration
            if (this.engineOn) {
                const velX =
                    this.velocity.x + (THRUST / 100) * Math.sin(this.angle)
                const velY =
                    this.velocity.y - (THRUST / 100) * Math.cos(this.angle)
                const maxSpeed = 4

                velX < maxSpeed && velX > -maxSpeed && (this.velocity.x = velX)
                velY < maxSpeed && velY > -maxSpeed && (this.velocity.y = velY)
            }

            console.log(this.velocity.x, this.velocity.y)

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
        if (keyCode === 32) spaceShip.pew = isKeyDown
    }

    function draw() {
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
