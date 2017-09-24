angular.module('anagrams', []);

angular.module('anagrams').controller('mainController', function($scope) {

  $scope.anagramCharacters = '';

  $scope.rows = [];

  $scope.generate = function() {
    $scope.rows = [];

    addRows();
  };

  $scope.regenerate = function() {
    $scope.rows = $scope.rows.filter(function(row) {
      return row.shouldRemember;
    });

    addRows();
  };

  $scope.sortRows = function() {
    $scope.rows.sort(function(rowA, rowB) {
      var anagramA = rowA.anagram.toLowerCase();
      var anagramB = rowB.anagram.toLowerCase();
      if(anagramA < anagramB) return -1;
      if(anagramA > anagramB) return 1;
      return 0;
    });
  };

  $scope.filterRows = function(row) {
    if (!$scope.searchText) return true;
    return row.anagram.indexOf($scope.searchText) !== -1;
  };

  function getRandomAnagram() {
    var currentIndex = $scope.anagramCharacters.length;
    var randomIndex;
    var temp;
    var anagram = $scope.anagramCharacters.split('');

    while (currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temp = anagram[currentIndex];
      anagram[currentIndex] = anagram[randomIndex];
      anagram[randomIndex] = temp;
    }

    return anagram.join('');
  }

  function addRows() {
    var tryCount = 0;
    var anagramWasFoundAlready;
    var anagram;

    while (tryCount < 50 && $scope.rows.length < 10) {

      anagram = getRandomAnagram();
      anagramWasFoundAlready = $scope.rows.some(function(row) {
        return row.anagram === anagram;
      });

      if (anagram.length && !anagramWasFoundAlready) {
        $scope.rows.push({
          anagram: anagram,
          shouldRemember: false
        });
      }

      tryCount += 1;
    }
  }
});
