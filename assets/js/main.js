let cur = 1;
let loop = 0;

$(document).keydown(function (e) {
    switch (e.which) {
        case 38:
            if (cur > 1) cur--;
            loop = 2;
            break;
        case 40:
            if (cur < 4) cur++;
            loop = 2;
            break;
        case 13:
            console.log(cur);
        default: return;
    }
    e.preventDefault();
});

function arrow() {
    if (loop % 5 == 0) {
        $(".arrow").each(function () {
            $(this).text("  ");
        });
    } else if (loop % 5 == 2) {
        let cnt = 1;
        $(".arrow").each(function () {
            if (cnt == cur) {
                $(this).text("> ");
            } else {
                $(this).text("  ");
            }
            cnt++;
        });
    }
    loop = (loop + 1) % 5;
}

setInterval(arrow, 150);