var APPLICATION_ID = 'A4D0E047-2158-8751-FF9A-29A946A7DF00',
    SECRET_KEY = 'D693F3BE-40FC-03D4-FFD9-28CB2B4A2C00',
    VERSION = 'v1';

function Info(args) {
    args = args || {};
    this.email = args.email || "";
    this.sex = args.sex || "";
    this.favorite = args.favorite || "";
}

function Pie(args) {
    args = args || {};
    this.value = args.value || "";
    this.color = args.color || "";
    this.highlight = args.highlight || "";
    this.label = args.label || "";
}

window.onload = function () {
    Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);
    var database = Backendless.Persistence.of(Info);

    var favorites = [];

    var countQuery = database.find(Info);
    countQuery.data.forEach(function (info) {
        if (!(info.favorite in favorites)) {
            favorites[info.favorite] = 1;
        } else {
            favorites.push(new Pie({
                value: 1,
                color: "#F7464A",
                highlight: "#FF5A5E",
                label: info.favorite
            }));
        }
    });

    var count = countQuery.data.length;

    var maleQuery = {
        condition: "sex = 'Male'"
    };
    var males = database.find(maleQuery);
    males = males.data.length;

    var femaleQuery = {
        condition: "sex = 'Female'"
    };
    var females = database.find(femaleQuery);
    females = females.data.length;

    document.getElementById("txtCount").innerText = "#People: " + count;
    document.getElementById("txtMale").innerText = "#Males: " + males;
    document.getElementById("txtFemale").innerText = "#Females: " + females;

    var context = document.getElementById("chartFavorite").getContext("2d");
    var chartFavorite = new Chart(context).Pie(data);
}
