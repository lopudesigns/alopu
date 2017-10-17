export default {
  data() {
    return {
    }
  },

  watch: {
  },

  methods: {
    optIn: function (option) {
      if (this.optionsMutable.indexOf(option) >= 0) {
        return true
      } else {
        return false
      }
    },
    optsIn: function (options) {
      for (let option of options) {
        if (this.optionsMutable.indexOf(option) >= 0) {
          // return true
        } else {
          return false
        }
      }
      return true
    },
    anyOptsIn: function (options) {
      for (let option of options) {
        if (this.optionsMutable.indexOf(option) >= 0) {
          return true
        }
      }
      return false
    },
    optIndex: function (option) {
      return this.optionsMutable.indexOf(option)
    },
    pushOpt: function (option) {
      if (!this.optIn(option)) {
        this.optionsMutable.push(option)
      }
    },
    pushOpts: function (options) {
      for (let option of options) {
        this.pushOpt(option)
      }
    },
    popOpt: function (option) {
      if (this.optIn(option)) {
        this.optionsMutable.splice(this.optIndex(option), 1)
      }
    },
    popOpts: function (options) {
      for (let option of options) {
        this.popOpt(option)
      }
    },
    toggleOpt: function (option) {
      if (this.optIn(option)) {
        this.popOpt(option)
      } else {
        this.pushOpt(option)
      }
    },
    toggleOpts: function (options) {
      for (let option in options) {
        if (this.optIn(option)) {
          this.popOpt(option)
        } else {
          this.pushOpt(option)
        }
      }
    },
  }
}
