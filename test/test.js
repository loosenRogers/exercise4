describe('this', function () {
  it('setTimeout_with_es6', function (done) {
    var obj = {
      say: function () {
        setTimeout(() => {
          // 因为用了es6的箭头函数所以会为函数自动绑定this，也就是obj
          // this 是什么？想想为什么？
          this.should.equal(obj)
          done()
        }, 0)
      }
    }
    obj.say()
  })

  it('setTimeout_with_es5', function (done) {
    var obj = {
      say: function () {
        var t = setTimeout(function(){
          this.should.equal(t);
          done();
        },0);
      }
    }
    obj.say()
  })

  it('global', function () {
    function test() {
      // this 是什么？想想为什么？
      this.should.equal(global)
    }
    test()
  })

  describe('bind', function () {
    it('bind undefined', function () {
      var obj = {
        say: function () {
          function _say() {
            // this 是什么？想想为什么？
            this.should.equal(global)
          }
          return _say.bind(obj)  // obj为undefined   所以bind之后为global
        }()
      }
      obj.say()
    })

    it('bind normal', function () {
      var obj = {}
      obj.say = function () {
        function _say() {
          // this 是什么？想想为什么？
          this.should.equal(obj)
        }
        return _say.bind(obj)
      }()
      obj.say()
    })
  })


})
