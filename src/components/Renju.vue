<template>
  <div>
    <br>
    <p v-if="renju && renju.winner">{{renju.winner === 'B' ? '⚫️' : '⚪️'}} Wins!</p>
    <p v-else-if="renju && renju.draw">🌓 Draw </p>
    <p v-else-if="renju">{{renju.plays === 'B' ? '⚫️' : '⚪️'}} Plays</p>
    <br>
    <div :key="key" class="board">
      <div v-for="(row, i) in matrix" :key="i" class="row">
        <span
          v-for="(celd, j) in row"
          :key="j" class="celd"
          @click="play(i,j)"
        >
          <span
            :style="getStyle(celd.split('')[1])"
          >
            {{ getIcon(celd.split('')[1]) }}
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import Renju from 'renju';

export default {
  data() {
    return {
      renju: null,
      key: new Date().getTime(),
    };
  },
  computed: {
    matrix() {
      if (!this.renju) {
        return [];
      }
      return this.renju.getMarkedMatrix();
    },
  },
  methods: {
    getIcon(code) {
      if (code === 'B') {
        return '⚫️';
      }
      if (code === 'W') {
        return '⚪️';
      }
      if (code === '6' && this.renju.plays === 'B') {
        return '⓺';
      }
      if (code === '4' && this.renju.plays === 'B') {
        return '⓸';
      }
      if (code === '3' && this.renju.plays === 'B') {
        return '⓷';
      }
      return '';
    },
    getStyle(code) {
      if (
        (code === '6' || code === '4' || code === '3')
        && this.renju.plays === 'B') {
        return 'color: red;';
      }
      return '';
    },
    play(i, j) {
      this.renju.play(i, j);
      this.renju.print();
      this.key = new Date().getTime();
      if (this.renju.winner !== null || this.renju.draw) {
        this.$confetti.start({
          particles: [
            {
              type: 'rect',
            },
            {
              type: 'circle',
              colors: [
                'red',
                'pink',
              ],
            },
          ],
          particlesPerFrame: 2,
        });
        setTimeout(() => {
          this.$confetti.stop();
        }, 2000);
      }
    },
  },
  mounted() {
    this.renju = new Renju();
  },
};
</script>

<style scoped>
.row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.celd {
  display: block;
  width: 41px;
  height: 41px;
  color: black;
  cursor: pointer;
  text-align: center;
  line-height: 41px;
  position: relative;
  font-size: 30px;
  background: rgba(202, 123, 5, 0.5);
}
.row .celd::after {
  content: "";
  position: absolute;
  top: 20px;
  left: 0;
  height: 1px;
  width: 41px;
  background-color: black;
  z-index: -1;
}
.row .celd::before {
  content: "";
  position: absolute;
  top: 0px;
  left: 20px;
  height: 41px;
  width: 1px;
  background-color: black;
  z-index: -1;
}
.row:first-child .celd::before {
  top: 20px;
}
.row:last-child .celd::before {
  top: -20px;
}
.row .celd:first-child::after {
  left: 20px;
}
.row .celd:last-child::after {
  left: -20px;
}
</style>
