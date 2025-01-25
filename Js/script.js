$(document).ready(function () {
    let currentQuestion = 0;
    const questions = $("section");
    const timerDisplay = $("#timer");
    let timer;
    let totalStars = 0;

    $(".stars").hide(); // Hide stars initially


    // Function to show the current question
    function showQuestion(index) {
        questions.hide();
        $(".stars").hide();

        $(questions[index]).addClass("offscreen").show(); // Positions the current question off-screen to the right (`offscreen` class) and makes it visible.


        setTimeout(function () {
            $(questions[index]).removeClass("offscreen").addClass("onscreen"); // Slide in
        }, 0); // Tiny delay to apply transition immediately
    }

    function startTimer() {
        let timeLeft = 10;
        timerDisplay.text(`Time left: ${timeLeft} secs`);

        if (timer) {
            clearInterval(timer);
        }

        timer = setInterval(function () {
            timeLeft--;
            timerDisplay.text(`Time left: ${timeLeft} secs`);

            if (timeLeft <= 0) {
                clearInterval(timer);
                nextQuestion();
            }
        }, 1000);
    }

    function nextQuestion() {
        if (currentQuestion < questions.length - 1) {
            $(questions[currentQuestion]).removeClass("onscreen").addClass("offscreen");

            setTimeout(function () {
                $(questions[currentQuestion]).hide();
                currentQuestion++;
                showQuestion(currentQuestion);
                startTimer();
            }, 1000);
        } else {
            $(questions[currentQuestion]).removeClass("onscreen").addClass("offscreen");

            setTimeout(function () {
                $(questions[currentQuestion]).hide();
                displayResult();
            }, 1000);
            clearInterval(timer);
        }
    }

    function displayResult() {
        let message = "";

        if (totalStars <= 13) {
            message = `You are a neuroticism which often leads you to overanalyze even the smallest mistakes, 
                causing unnecessary stress. But in a positive way, it drives you to be highly detail-oriented 
                and prepared if you choose to use it right.`;
        } else if (totalStars <= 24) {
            message = `You are open to experience. You have an imaginative mind and can also be highly creative. 
                You love exploring and experimenting with a lot of things, including novel ideas 😏😏.`;
        } else if (totalStars <= 36) {
            message = ` You are always conscientious: organized, responsible, self-disciplined, dependable, and goal-driven. 
                But you can cut yourself some slack, you know.`;
        } else if (totalStars <= 50) {
            message = ` Extraversion is a good trait. You are sociable, energetic, assertive, and enthusiastic about interacting 
                with others, mostly the people you really love. But it's nice to give some strangers a chance, you know.`;
        }

        timerDisplay.text("Quiz Complete!");
        $("#result").html(`<p>${message}</p>`).fadeIn();

    }

    $(".options button").click(function () {
        $(".stargroup .stars").hide();

        $(this).siblings(".stargroup").find(".stars").fadeIn(300);


        $(this).siblings("button").prop("disabled", true);
        $(this).prop("disabled", true);

        setTimeout(nextQuestion, 500);
    });
    $(".opt").click(function () {

        const starValue = parseInt($(this).val());
        totalStars += starValue;
        console.log(totalStars)

    });
    showQuestion(currentQuestion);
    startTimer();
});