$(document).ready(function() {
    $(".expand-button").click(function() {
        const card = $(this).closest(".card");
        const expanded = card.find(".expanded");

        if (expanded.hasClass("d-none")) {
            expanded.removeClass("d-none");
            $(this).text("Read Less"); 
        } else {
            expanded.addClass("d-none");
            $(this).text("Read More"); 
        }
    });

    $("#projectCarousel").on("slid.bs.carousel", function () {
        
        $(".card .expanded").addClass("d-none");
        $(".expand-button").text("Read More");
    });
});