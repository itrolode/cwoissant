

    let subject_shown;
    let verb_chosen;
    let full_word;
    let meaning_verb;
    let half_word;
    let verb_type;
    let random_num;
    let random_verb;
    let counter = 0;

    
    //shows the all conjugations for the verb on click
    element("showconj").addEventListener('click',function(){
            let text = conjugator(0) + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + conjugator(4) + "<br>" +
            conjugator(1) + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + conjugator(5) + "<br>" +
            conjugator(2) + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + conjugator(6) + "<br>" +
            conjugator(3) + "&nbsp;&nbsp;&nbsp;" + conjugator(7);
            element("showingconj").innerHTML = text;
            element("showingconj").style.display = 'block'; 

        })
    
    element("accents").addEventListener('click',function(event) { 
        let accent = event.target.textContent;
        element("ans1").value += accent;
    } )


    element("buttons").addEventListener('click',function() {
        element("buttons").style.display = 'none';
        element("error").style.display = 'block';
    })

    //for conjugations section button
    element("conj").addEventListener('click', function() {
        element("buttons").style.display = 'none';
        element("conj").style.display = 'none';
        element("theform").style.display = 'block';
        element("accents").style.display = 'block';
        element("counter").style.display = 'block';
        element("counter").textContent = counter;
        verb_subject_randomizer();
        conjugator(random_num);

        let question2 = "Qu'est-ce que ça veut dire? : " + verb_chosen;
        element("question2").textContent = question2;

        let question1 = "Conjuguez " + verb_chosen + " pour " + subject_shown + ":";
        element("question1").textContent = question1;
    })

    let Submittedbefore = false;

    element("theform").addEventListener('submit', function(event) {
                
        //ensure form is not reloaded and variables reset
        event.preventDefault();

        //first time button press
        if (!Submittedbefore) {


            let answer1 = element("ans1").value.toLowerCase().trim();
            let answer2 = element("ans2").value.toLowerCase().trim();
            element("comments").style.display = 'block';
            element("showconj").style.display = 'block';
            element("showconj").textContent =  "show conjugations for " +  verb_chosen;

            //if correct
            if ((answer1 == full_word || answer1 == half_word) && 
                (verbs_english[verb_type][random_verb].includes(answer2) || 
                (answer2.slice(0,3) == "to " && verbs_english[verb_type][random_verb].includes((answer2.slice(3)))))) {

                element("comments").textContent = "Good job!! You got it right!";
                counter = counter + 1;
                element("counter").textContent = counter;

            }

            //if wrong show corrected ans
            else {
                let comment = "oh no you got it wrong. <br> the verb, " + verb_chosen + " means to " + meaning_verb
                                + "<br>conjugated being : " + full_word;
                element("comments").innerHTML = comment;
                counter = counter - 1;
                element("counter").textContent = counter;

            }

            Submittedbefore = true;

        }
        //second time button press
        else if (Submittedbefore) {

            //clear the answer boxes and hide comments
            element("ans1").value = "";
            element("ans2").value = "";
            element("comments").style.display = 'none';
            element("showconj").style.display = 'none';
            element("showingconj").style.display = 'none'; 



            //make new question
            verb_subject_randomizer();
            conjugator(random_num);
            let question = "Conjuguez " + verb_chosen + " pour " + subject_shown;
            element("question1").textContent = question;


            let question2 = "Qu'est-ce que ça veut dire? : " + verb_chosen;
            element("question2").textContent = question2;

            Submittedbefore = false;
        }
    })


    //domestic animals - 0 - 9
    //farm animals - 10 - 18
    

    //when adding a new irregular verbs, add it in verbs_irregular array, it's own array of verb name,
    //verbs_english, and in the verbs array. 
    let aller = ["vais","vas","va","va","allons","allez","vont","vont"]
    let avoir = ["ai","as","a","a","avons","avez","ont","ont"]
    let être = ["suis","es","est","est","sommes","êtes","sont","sont"]
    let boire = ["bois","bois","boit","boit","buvons","buvez","bouvent","bouvent"]
    let dormir = ["dors","dors","dort","dort","dormons","dormez","dorment","dorment"]
    let faire = ["fais","fais","fait","fait","faisons","faites","font","font"]
    let verbs_irregular = [aller,avoir,être,boire,dormir,faire,"lire","écrire"];



    //when adding a new verb, add it in the correct place in verbs
    //and adds its meaning in verbs_english
    let verbs = [["manger","partager","nager","commencer","aimer","chercher","parler","jouer","danser","écouter", "demander", "donner",
    "fêter", "habiter", "marcher", "penser", "regarder", "travailler", "trouver","voyager", "visiter","hurler"],
    ["bâtir", "choisir", "finir", "guérir","remplir","rougir","vieillir"],
    ["attendre","confondre","fondre","mordre","vendre","répondre","perdre"],
    ["aller","avoir","être","boire","dormir","faire"]]

    let verbs_english = [[["eat"],["share","divide","distribute"],["swim"],["start","begin"],["like","love"],
    ["search","look for","seek"],["speak","talk"],["play"],["dance"],["listen","hear"],["ask","request"],["give","provide"],["celebrate"],
    ["live","reside"],["walk","march"],["think"],["look","watch"],["work"],["find","discover"],["travel"],["visit"],["scream","shout"]],
    [["build"],["choose","select"],["finish","complete"],["recover","heal"],["fill","fill up"],["blush","turn red"],["age","grow old"]],
    [["wait"],["confuse","mix up"],["melt"],["bite"],["sell"],["answer","respond"],["lose"]],
    [["go"],["have","own"],["be"],["drink"],["sleep"],["make","do"]]];



    let pronouns = ["je","tu","il","elle","nous","vous","ils","elles"]
    let conjugations = [["e","es","e","e","ons","ez","ent","ent"],
                        ["is","is","it","it","issons","issez","issent","issent"],
                        ["s","s","","","ons","ez","ent","ent"]]


    // document.getelemtnbyblablab
    function element(id) {
        return document.getElementById(id)
    }

    //random num function, returns a number from min (inclusive) to max (non inclusive )
    function random(min,max) {
        let num = Math.floor(Math.random()*(max-min)) + min;
        return num;
    }
    
    function verb_subject_randomizer() {

        //randomly chooses a verb type (needs weighting based on no of verbs in each verb type)
        let total = verbs[0].length + verbs[1].length + verbs[2].length + verbs[3].length;
        let verb_type_random = Math.random();

        let er = verbs[0].length/total;
        let ir = verbs[1].length/total;
        let re = verbs[2].length/total;
        let chance_irregular = verbs[3].length/total;


        //decides which of the weighted range the die cast has fallen into
        if (verb_type_random < er) {
            verb_type = 0; }
        
        else if (verb_type_random < (er + ir)) {
            verb_type = 1; }
        
        else if (verb_type_random < (er + ir + re)) {
            verb_type = 2; }

        else {
            verb_type = 3; }

        
        //choose the verb in the verb type
        random_verb = random(0,verbs[verb_type].length);
        verb_chosen = verbs[verb_type][random_verb];

        //choose the subject type
        random_num = random(0,pronouns.length);

        //find the verb in english
        meaning_verb = verbs_english[verb_type][random_verb][0];
    }

    function conjugator(pronoun_num) {

        let subject = pronouns[pronoun_num] + " ";
        subject_shown = pronouns[pronoun_num];

        //creating proper verb ending
        //if it's a regular verb
        if (verb_type < 3) {

            //make verb stem (slice (start, end)) (doesnt include end) - irregular verbs dont need stem
            let stem = verb_chosen.slice(0,verb_chosen.length-2);
            let verb_ending;


            //if it's regular er verb that's weird and conjugated with nous
            if (verb_type == 0 && random_verb < 4 && subject == "nous ") {

                //if's to share, to swim and to eat
                if (random_verb < 3) {
                    verb_ending = "eons";
                } 

                //if it's to start
                else {
                    stem = "commen";
                    verb_ending = "çons";
                }}
            
            else {
                //conjugate regular verb (random_num linked to pronoun)
                verb_ending = conjugations[verb_type][pronoun_num];
            }
            
            //make half word and full word for regular verbs
            half_word = stem + verb_ending;

        }

        else {

            
            //conjugate for irregular verbs
            let present_particle = verbs_irregular[random_verb][pronoun_num];
            half_word = present_particle;
        }

        //check if je => j' is needed
        const exceptions = ["hurler"];
        const vowels = ["a","à","â","ä","e","é","è","ê","ë","i","î","ï","o","ô","ö","u","ù","û","ü","y","ÿ","h"];            
        let first_letter = half_word[0];
        if (subject == "je " && vowels.includes(first_letter) && !(exceptions.includes(verb_chosen))) {
            subject = "j'"
        }

        full_word = subject + half_word;

        return full_word;

    }