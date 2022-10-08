class ManagerPytanClass {


    constructor(jaki_jezyk) {
        this.docelowy_jezyk = jaki_jezyk
    }

    sprawdz(pl_odp, de_odp, odp) {

        if (this.docelowy_jezyk == 'de') {
            if (odp == de_odp)
                return true
            else
                return false
        } else {
            if (odp == pl_odp)
                return true
            else
                return false
        }
    }

}

module.exports = {
    ManagerPytanClass
}