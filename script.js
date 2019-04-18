var data = d3.json('penguins/classData.json')
.then(function(data){
  console.log(getCorr(data[0],data[0]));
  //console.log(data[0]);
});



var getGrades = function(data){
  var grades = data.map(function(d){
    return d3.mean(d.quizes,function(d){
      return d.grade;
    });
  })
  return grades;
};



  var height = 500;
  var width = 500;

  var svg = d3.select('svg')
              .attr('height',height)
              .attr('width',width);

  var getQuizes = function(peng){
    var quizGrades = peng.quizes.map(function(d){
      return d.grade;
    })
    return quizGrades;
  };

var getCorr = function(peng1,peng2){
  console.log(peng1)
  var mean1 = getGrades(peng1)
  var mean2 = getGrades(peng2)
  var std1 = d3.deviation(getQuizes(peng1))
  var std2 = d3.deviation(getQuizes(peng2))
  var sum = peng1.reduce(function(total,d,i){
    return total + ((d-mean1)*peng2[i]-mean2)/(std1 * std2);
  });
  return sum;
};
