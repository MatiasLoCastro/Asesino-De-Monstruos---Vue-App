new Vue({
    el: '#app',
    data: {
        saludJugador: 100,
        saludMonstruo: 100,
        hayUnaPartidaEnJuego: false,
        turnos: [], //es para registrar los eventos de la partida
        esJugador: false,
        rangoAtaque: [3, 10],
        rangoAtaqueEspecial: [10, 20],
        rangoAtaqueDelMonstruo: [5, 12],
    },

    methods: {
        getSalud(salud) {
            return `${salud}%`
        },
        empezarPartida: function () {
            return this.hayUnaPartidaEnJuego = true;
        },
        atacar: function () {
            var herida = this.calcularHeridas(this.rangoAtaque)
            this.saludMonstruo -= herida;
            this.turnos.unshift({
                isPlayer: true,
                text: 'El jugador golpea al monstruo por ' + herida
            });
            if (this.verificarGanador()) {
                return;
            }
            this.ataqueDelMonstruo();
        },

        ataqueEspecial: function () {
            var herida = this.calcularHeridas(this.rangoAtaqueEspecial);
            this.saludMonstruo -= herida;
            this.turnos.unshift({
                isPlayer: true,
                text: 'El jugador golpea fuertement al monstruo por ' + herida
            });
            if (this.verificarGanador()) {
                return;
            }
            this.ataqueDelMonstruo();
        },

        curar: function () {
            if (this.saludJugador < 90) {
                this.saludJugador += 10;
            } else {
                this.saludJugador = 100;
            }
        },

        registrarEvento(evento) {
        },
        terminarPartida: function () {
            this.saludJugador = 100;
            this.saludMonstruo = 100;
            this.turnos = [];
            return this.hayUnaPartidaEnJuego = false;
        },

        ataqueDelMonstruo: function () {
            var herida = this.calcularHeridas(this.rangoAtaqueDelMonstruo);
            /* return */ this.saludJugador -= herida
            this.turnos.unshift({
                isPlayer: false,
                text: 'El monstruo ataca al jugador por ' + herida
            });
            this.verificarGanador();
        },

        calcularHeridas: function (rango) {
            return Math.max(Math.floor(Math.random() * rango[1]) + 1, rango[0]);
        },
        verificarGanador: function () {
            if (this.saludJugador <= 0) {
                if (confirm('Ganó el monstruo! ¿ Deseas iniciar una nueva partida ? ')) {
                    this.empezarPartida();
                } else {
                    this.hayUnaPartidaEnJuego = false;
                }
                return true;
            } else if (this.saludMonstruo <= 0) {
                if (confirm('Ganaste! ¿ Deseas iniciar una nueva partida ? ')) {
                    this.empezarPartida()
                } else {
                    this.hayUnaPartidaEnJuego = false;
                }
                return true;
            }
            return false;
        },
        cssEvento(turno) {
            //Este return de un objeto es prque vue asi lo requiere, pero ponerlo acá queda mucho mas entendible en el codigo HTML.
            return {
                'player-turno': turno.esJugador,
                'monster-turno': !turno.esJugador
            }
        }
    }
});