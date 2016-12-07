<matrix>
    <matrix-header
            on_font_change={handleFontChange}
            default_font_size={this.opts.fontSize}
            on_click_push_text={pushText}
    >
    </matrix-header>
    <canvas id="matrix"></canvas>

    <script>
        import {initializeMatrix, moveDrops, queueRandomText} from '../actions'
        import {createInitialDrops} from '../utils'

        this.on('mount', () => {
            const c = document.getElementById("matrix")
            const ctx = c.getContext("2d")

            c.height = window.innerHeight - c.offsetTop
            c.width = window.innerWidth

            const columns = c.width / this.opts.fontSize

            this.opts.store.dispatch(initializeMatrix({
                ctx,
                height: c.height,
                width: c.width,
                drops: createInitialDrops(columns)
            }))

            setInterval(updateDraw, this.opts.frameRate)
            setInterval(queueStr, this.opts.newTextInterval)

        });
        function draw({ctx, textArray, fontSize, fontColor, height, width, drops}) {
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
            ctx.fillRect(0, 0, width, height)

            ctx.fillStyle = fontColor
            ctx.font = fontSize + "px arial"

            for (let i = 0; i < drops.length; i++) {
                const text = textArray[Math.floor(Math.random() * textArray.length)]
                ctx.fillText(text, i * fontSize, drops[i] * fontSize)
            }
        }

        const store = this.opts.store

        store.subscribe(() => {
            draw(store.getState())
        })

        const updateDraw = () => {
            this.opts.store.dispatch(moveDrops())
        }
        const queueStr = () => {
            this.opts.store.dispatch(queueRandomText())
        }
        this.handleFontChange = (e) => {
            const {width} = store.getState()
            this.opts.store.dispatch(initializeMatrix({
                fontSize: e.target.value,
                drops: createInitialDrops(width / e.target.value)
            }))
        }
        this.pushText = (e)  => {
            this.opts.store.dispatch(queueNewText(document.getElementById("pushtext-input").value))
        }
    </script>
</matrix>
