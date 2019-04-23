var data = d3.json('penguins/classData.json')
.then(function(data){
  //console.log(data)
  //console.log(getCorr(data[0].quizes,data[0].quizes))
  var quizzes = data.map(function(d){
    //console.log(d.quizes)
    return d.quizes;
  })

  var homework = data.map(function(d){
    //console.log(d.quizes)
    return d.homework;
  })


  //console.log(quizzes)
  drawGraph(makeArray(quizzes),"svg");
  //console.log(makeArray(quizzes))
  drawGraph(makeArray(homework),"#homework");
});

var drawGraph = function(quizzes,svg){
  console.log(quizzes)

  var height = 600;
  var width = 600;

  var colors = d3.scaleLinear(d3.schemeBlues[3])

  var xScale = d3.scaleLinear()
                .domain([0,23])
                .range([0,width]);

  var yScale = d3.scaleLinear()
                .domain([0,23])
                .range([0,height]);

  var svg = d3.select(svg)
              .attr("height",height)
              .attr("width",width)
              .selectAll("rect")
              .data(quizzes)
              .enter()
              .append("rect")
              .attr("x",function(d){
                console.log(d)
                return xScale(d.pengi1);
              })
              .attr("y",function(d){
                return yScale(d.pengi2);
              })
              .attr("height",height/23)
              .attr("width",width/23)
              .attr("fill",function(d){
                return colors(d.corr);
              });
  };




var makeArray = function(data){
  var arr = []
  data.forEach(function(peng1,pi1){
    data.forEach(function(peng2,pi2){
      point = {
        pengi1:pi1,
        pengi2:pi2,
        corr:getCorr(peng1,peng2)
      }
      arr.push(point)
    })
  })
  return arr;
}

var getGrades = function(data){
  var grades = data.map(function(d){
      return d.grade;
    });
  return grades;
}

  var getQuizes = function(peng){
    var quizGrades = peng.map(function(d){
      return d.grade;
    })
    //console.log(quizGrades);
    return quizGrades;
  };

var getCorr = function(peng1,peng2){
  //console.log(peng1)
  var mean1 = d3.mean(getGrades(peng1))
  var mean2 = d3.mean(getGrades(peng2))
  var std1 = d3.deviation(getGrades(peng1))
  var std2 = d3.deviation(getGrades(peng2))
  var sum = peng1.reduce(function(total,d,i,arr){
    var thing = (((d.grade-mean1)/std1)*((peng2[i].grade-mean2)/std2));
      //console.log(thing)
      //console.log(total)
      return total + thing;
  },0);
  //console.log(sum)
  //console.log(1/(peng1.length - 1))
  return sum * (1/(peng1.length - 1));

};
