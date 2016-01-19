(function() {
  // make highcharts
  var Chart = function(){
    this.series = null;
    this.$container = $("#chart");

    this.init();
  };

  Chart.prototype.init = function(){
    var self = this;
    this.$container.highcharts({
      chart: {
        type: "spline",
        animation: Highcharts.svg,
        marginRight: 10,
        events: {
          load: function() {
            self.series = this.series[0];
          }
        }
      },
      title: {
        text: "Speech Analysis"
      },
      xAxis: {
        type: "linear",
        tickInterval: 1
      },
      yAxis: {
        title: {
          text: "Value"
        },
        plotLines: [{
          value: 0,
          width: 1,
          color: "#808080"
        }]
      },
      legend: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      series: [{
        name: "main data",
        data: [0,0,0,0,0,0,0,0,0,0,0]
      }]
    });
  };

  Chart.prototype.addPoint = function(point){
    if(!this.series){return;}
    this.series.addPoint(point, true, true);
  };

  // record speech
  var Speech = function(){
    this.speeching = false;
    this.recognition = new webkitSpeechRecognition();
    this.$btnStart = $("#start");
    this.$btnStop = $("#stop");
    this.$tip = $("#tip");

    var recognition = this.recognition;

    recognition.lang = "zh-CN";
    recognition.continuous = true;
    recognition.interimResults = true;
  };

  Speech.prototype.start = function(onresultCall){
    if(this.speeching){return;}
    this.speeching = true;
    this.$btnStart.addClass("hide");
    this.$btnStop.removeClass("hide");
    this.$tip.removeClass("hide");

    var recognition = this.recognition;

    recognition.onresult = function(event) {
      if(onresultCall){onresultCall(event);}
    };
    recognition.start();
  };

  Speech.prototype.stop = function(){
    if(!this.speeching){return;}
    this.speeching = false;
    this.$btnStart.removeClass("hide");
    this.$btnStop.addClass("hide");
    this.$tip.addClass("hide");

    var recognition = this.recognition;

    recognition.stop();
    recognition.onresult = null;
  };

  // init
  var chart = new Chart(),
    speech = new Speech(),
    app = {};

  app.start = function(){
    speech.start(function(event){
      for (var i = event.resultIndex, factor; i < event.results.length; ++i) {
        factor = event.results[i][0].confidence*10;
        chart.addPoint(factor);
      }
    });
  };

  app.stop = function(){
    speech.stop();
  };

  app.addPoint = function(){
    chart.addPoint(Math.random()*10)
  };

  // exports
  window.app = app;
})();
