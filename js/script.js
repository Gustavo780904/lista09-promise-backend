var $level;
var $users = new Array();
$(document).ready(function() {
    readyUsers()
    $("#visualizar").click(function() {
        console.log("!!!")
        $("#remove").remove()
        filter($users)
        console.log($level)
    })
})

function table() {
    $tableRanking = $(`<table></table>`).addClass("");
    $headerTable = $(`<th>Username</th><th></th>Score<th>Level</th>`)

    $($tableRanking).append($headerTable);
    $tableLine = new Array();
    for (data in $ranking) {}
    $($tableRanking).append($tableLine);
    $("#view").append($tableRanking);
}

function readyUsers() {
    fetch("json/users.json")
        .then(file => file.json())
        .then(contents => {

            $level = getLevel();
            contents.users.forEach(users => {
                $users.push({ "username": users.username, "score": users.score, "level": users.level })
            })
            console.log($users)
            console.log($level)

        })
        .catch(err => console.log(err))
}

function filter() {
    $level = getLevel()
    strategy = (a, b) => b - a;
    $levelFilter = (userslist, level) => (userslist.filter(valor => valor.level === level)).map((score, user) => ({...user, ...score })).reduce((list, next) => [...list, next], []).sort((a, b) => strategy(a.score, b.score));
    console.log($levelFilter($users, $level))
    $rankingLevel = $levelFilter($users, $level, strategy)

    $tableRanking = $(`<table id="remove"></table>`).addClass("container table");
    $headerTable = $(`<th>Username</th> <th>Score<th> <th>Level</th>`)
    $tableLine = new Array();
    for (data in $rankingLevel) {
        $tableLine[data] = (`<tr><td>${$rankingLevel[data].username}</td><td>${$rankingLevel[data].score}</td><td>${$rankingLevel[data].level}</td></tr>`)
    }

    console.log($tableLine)
    $($tableRanking).append($headerTable);
    $($tableRanking).append($tableLine);
    $("#usersTable").append($tableRanking);
}

function getLevel() {
    return $("#level").val()
}