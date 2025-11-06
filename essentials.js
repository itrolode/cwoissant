        // document.getelemtnbyblablab
        function element(id) {
            return document.getElementById(id)
        }

        //random num function, returns a number from min (inclusive) to max (non inclusive )
        function random(min,max) {
            let num = Math.floor(Math.random()*(max-min)) + min;
            return num;
        }