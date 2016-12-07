<matrix-header>
    <h1>Matrix on Redux</h1>
    <label for="fontSize">FontSize</label>
    <select id="fontSize" onchange={opts.on_font_change}>
        <option each={i in fontSizes} value="{i}" >{i}</option>
    </select>

    <lable for="pushtext-input">Push text</lable><input id="pushtext-input" type="text" maxlength="2" value="">
    <button onclick={opts.on_click_push_text}>push</button>
    <script>
        this.fontSizes = [1, 2, 3, 5, 10, 16, 20, 24, 36]

        this.on('mount', () => {
            document.getElementById('fontSize').value = opts.default_font_size
        })
    </script>
</matrix-header>