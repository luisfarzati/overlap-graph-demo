angular.module('overlap', [])

.value('Graph', { nodes: [], links: [] })

.controller('NodeListController', function ($scope, Graph) {
  $scope.nodes = Graph.nodes;
})

.controller('GraphController', function ($scope, Graph) {

  $scope.graph = Graph;

  // default
  $scope.overlapLength = 3;

  $scope.$watch('[graph, overlapLength]', function () {
    var tails = Graph.nodes.reduce(function (tails, node) {
      var p = node.prefix($scope.overlapLength);
      (tails[p] = tails[p] || []).push(node);

      return tails;
    }, {});

    Graph.links = Graph.nodes.reduce(function (links, node) {
      var pairs = (tails[node.suffix($scope.overlapLength)] || []).map(function (targetNode) {
        return { source: node, target: targetNode}
      });

      links = links.concat(pairs);
      return links;
    }, []);
  }, true);

})

.controller('NodeEntryController', function ($scope, Graph) {

  function Node(name, sequence) {
    this.name = name;
    this.sequence = sequence;
  }
  Node.prototype.prefix = function (size) {
    return this.sequence.substr(0, size);
  };
  Node.prototype.suffix = function (size) {
    return this.sequence.substr(-size);
  };

  $scope.newNode = {};

  this.addNode = function () {
    Graph.nodes.push(new Node(angular.copy($scope.newNode.name), angular.copy($scope.newNode.sequence)));
    $scope.newNode = {};
  };

});
