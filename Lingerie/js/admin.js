var APPLICATION_ID = 'A4D0E047-2158-8751-FF9A-29A946A7DF00',
    SECRET_KEY = 'D693F3BE-40FC-03D4-FFD9-28CB2B4A2C00',
    VERSION = 'v1';

window.onload = function () {
    Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);
}

function Info(args) {
    args = args || {};
    this.email = args.email || "";
    this.sex = args.sex || "";
    this.favorite = args.favorite || "";
}

function saveInfo() {
    var database = Backendless.Persistence.of(Info);
    var email = document.getElementById("inputEmail").value;
    var sex = "";
    if (document.getElementById("inputSexMale").checked) {
        sex = "Male";
    } else if (document.getElementById("inputSexFemale").checked) {
        sex = "Female";
    } else {
        sex = "Unknown";
    }
    var favoriteOptions = document.getElementById("inputFavorite");
    var favorite = favoriteOptions.options[favoriteOptions.selectedIndex].value;

    var infoObject = new Info({
        email: email,
        sex: sex,
        favorite: favorite
    });

    var query = {
        condition: "email = '" + email + "'"
    };
    var result = database.find(query);
    if (result.data.length > 0) {
        console.log("Already exists");
        var existingInfo = result.data[0];
        existingInfo["sex"] = sex;
        existingInfo["favorite"] = favorite;
        database.save(existingInfo);
    } else {
        database.save(infoObject);
    }
}
