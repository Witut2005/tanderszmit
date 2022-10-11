const Color = require('./colors.js')
const prompt = require('prompt-sync')({ sigint: true })
const ArgumentParser = require('argparse')
const mySql = require('mysql')
const managerPytan = require('./manager_pytan.js')
const random = require('random')

const NewPoll = mySql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',

})

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const Parser = new ArgumentParser.ArgumentParser()

Parser.add_argument('-temat')
Parser.add_argument('-pl', { action: 'store_true' })
Parser.add_argument('-de', { action: 'store_true' })
    // Parser.add_argument('-h', { help: 'opcje:\nzaimki_osobowe_biernik\nzaimki_osobowe_celownik\n' })
args = Parser.parse_args()

if (args['pl'] == true && args['de'] == true) {
    console.log('Mozesz wlaczyc tylko jedna opcje')
    process.exit(1)
}

ManagerPytan = null

if (!args['pl'] && !args['de']) { args['de'] = true }

if (args['pl']) {
    ManagerPytan = new managerPytan.ManagerPytanClass('pl')
} else
    ManagerPytan = new managerPytan.ManagerPytanClass('de')


// console.log(args['pl'])
// console.log(args['de'])


dobreOdpowiedzi = 0
iloscPytan = 0

if (args['temat'] == 'zaimki_osobowe_biernik') {
    NewPoll.query('select * from niemiecki.zaimki_os_biernik', (err, result) => {

        iloscPytan = 9

        for (i = 0; i <= iloscPytan - 1; i++) {
            idOfQuestion = i

            if (args['de'])
                console.log(result[idOfQuestion].pl)
            else
                console.log(result[idOfQuestion].de)

            givenAnswear = prompt('podaj odpowiedz: ')

            if (ManagerPytan.sprawdz(result[idOfQuestion].pl, result[idOfQuestion].de, givenAnswear)) {
                console.log(Color.FgGreen + 'ja, ferszteje diese verse')
                dobreOdpowiedzi++
            } else {
                if (ManagerPytan.docelowy_jezyk == 'de')
                    console.log(Color.FgRed + 'no ale jak tego mozesz nie wiedziec -> prawidlowa odpowiedz: ' + result[idOfQuestion].de)
                else
                    console.log(Color.FgRed + 'no ale jak tego mozesz nie wiedziec -> prawidlowa odpowiedz: ' + result[idOfQuestion].pl)
            }


            console.log(Color.Reset, end = '')
            console.log('--------------------')

        }
        console.log('twoj wynik: %d/%d', dobreOdpowiedzi, iloscPytan)
        process.exit(0)

    })
} else if (args['temat'] == 'zaimki_osobowe_celownik') {
    NewPoll.query('select * from niemiecki.zaimki_os_celownik', (err, result) => {

        iloscPytan = 9

        for (i = 0; i <= iloscPytan - 1; i++) {
            idOfQuestion = i
            console.log(result[idOfQuestion].pl)
            givenAnswear = prompt('podaj odpowiedz: ')
            if (givenAnswear == result[idOfQuestion].de) {
                console.log(Color.FgGreen + 'ja, ferszteje diese verse')
                dobreOdpowiedzi++
            } else
                console.log(Color.FgRed + 'no ale jak tego mozesz nie wiedziec -> prawidlowa odpowiedz: ' + result[idOfQuestion].de)

            console.log(Color.Reset, end = '')
            console.log('--------------------')
        }
        console.log('twoj wynik: %d/%d', dobreOdpowiedzi, iloscPytan)
        process.exit(0)

    })
} else if (args['temat'] == 'dsd1') {
    NewPoll.query('select * from niemiecki.dsd_test_1', (err, result) => {

        iloscPytan = 20

        for (i = 0; i <= iloscPytan - 1; i++) {
            idOfQuestion = i

            if (args['de'])
                console.log(result[idOfQuestion].pl)
            else
                console.log(result[idOfQuestion].de)

            givenAnswear = prompt('podaj odpowiedz: ')

            if (ManagerPytan.sprawdz(result[idOfQuestion].pl, result[idOfQuestion].de, givenAnswear)) {
                console.log(Color.FgGreen + 'ja, ferszteje diese verse')
                dobreOdpowiedzi++
            } else {
                if (ManagerPytan.docelowy_jezyk == 'de')
                    console.log(Color.FgRed + 'no ale jak tego mozesz nie wiedziec -> prawidlowa odpowiedz: ' + result[idOfQuestion].de)
                else
                    console.log(Color.FgRed + 'no ale jak tego mozesz nie wiedziec -> prawidlowa odpowiedz: ' + result[idOfQuestion].pl)
            }


            console.log(Color.Reset, end = '')
            console.log('--------------------')

        }
        console.log('twoj wynik: %d/%d', dobreOdpowiedzi, iloscPytan)
        process.exit(0)

    })

} else if (args['temat'] == 'spr1') {
    NewPoll.query('select * from niemiecki.spr1_chroby', (err, result) => {

        iloscPytan = 0

        for (i in result) {
            iloscPytan++
            idOfQuestion = i

            if (args['de'])
                console.log(result[idOfQuestion].pl)
            else
                console.log(result[idOfQuestion].de)

            givenAnswear = prompt('podaj odpowiedz: ')

            if (ManagerPytan.sprawdz(result[idOfQuestion].pl, result[idOfQuestion].de, givenAnswear)) {
                console.log(Color.FgGreen + 'ja, ferszteje diese verse')
                dobreOdpowiedzi++
            } else {
                if (ManagerPytan.docelowy_jezyk == 'de')
                    console.log(Color.FgRed + 'no ale jak tego mozesz nie wiedziec -> prawidlowa odpowiedz: ' + result[idOfQuestion].de)
                else
                    console.log(Color.FgRed + 'no ale jak tego mozesz nie wiedziec -> prawidlowa odpowiedz: ' + result[idOfQuestion].pl)
            }


            console.log(Color.Reset, end = '')
            console.log('--------------------')

        }
        console.log('twoj wynik: %d/%d', dobreOdpowiedzi, iloscPytan)
        process.exit(0)

    })

} else if (args['temat'] == 'spr1_podr') {
    NewPoll.query('select * from niemiecki.spr1_podr', (err, result) => {

        iloscPytan = 0

        while (1) {
            // iloscPytan++
            idOfQuestionGet = random.uniformInt((min = 0), (max = 122))
            idOfQuestion = idOfQuestionGet()

            if (args['de'])
                console.log(result[idOfQuestion].pl)
            else
                console.log(result[idOfQuestion].de)

            givenAnswear = prompt('podaj odpowiedz: ')

            if (ManagerPytan.sprawdz(result[idOfQuestion].pl, result[idOfQuestion].de, givenAnswear)) {
                console.log(Color.FgGreen + 'ja, ferszteje diese verse')
                dobreOdpowiedzi++
            } else {
                if (ManagerPytan.docelowy_jezyk == 'de')
                    console.log(Color.FgRed + 'no ale jak tego mozesz nie wiedziec -> prawidlowa odpowiedz: ' + result[idOfQuestion].de)
                else
                    console.log(Color.FgRed + 'no ale jak tego mozesz nie wiedziec -> prawidlowa odpowiedz: ' + result[idOfQuestion].pl)
            }


            console.log(Color.Reset, end = '')
            console.log('--------------------')

        }
        // console.log('twoj wynik: %d/%d', dobreOdpowiedzi, iloscPytan)
        // process.exit(0)

    })
} else
    console.log('iś ferszteje niszt')