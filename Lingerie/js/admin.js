window.onload = function () {
    var database = Backendless.Persistence.of(Info);

    var countQuery = database.find(Info);
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

    document.getElementById("txtCount").innerText = count;
    document.getElementById("txtMale").innerText = males;
    document.getElementById("txtFemale").innerText = females;
}
