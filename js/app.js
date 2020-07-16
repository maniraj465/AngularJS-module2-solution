(function(){
  angular.module("myApp", [])
  .controller("ToBuyListController", ToBuyListController)
  .controller("AlreadyBoughtListController", AlreadyBoughtListController)
  .provider("ShoppingService", ShoppingServiceProvider);

  ToBuyListController.$inject = ['ShoppingService'];
  function ToBuyListController(ShoppingService){
    var toBuyList = this; 
    toBuyList.toBuyItemList = ShoppingService.getListItems(); 
    
      toBuyList.addToBoughtList = function(index, itemName, itemCount){
        try{
          ShoppingService.addItem(itemName, itemCount);
          ShoppingService.toBuyRemoveItem(index);
        } 
        catch(error){
          toBuyList.errorMessage = error.message;
        }
      };
  }

  AlreadyBoughtListController.$inject = ['ShoppingService'];
  function AlreadyBoughtListController(ShoppingService){
    var alreadyBoughtList = this;
    
    alreadyBoughtList.boughtItemList = ShoppingService.getItems();
    alreadyBoughtList.removeItem = function(index, name, count){
      ShoppingService.addItemToBuy(name, count);
      ShoppingService.removeItem(index);
    };  
  }

  function ShoppingService(minItem){
    var service = this;
    var flag = false;
    var boughtItemList = [];
    var toBuyListItemList = [
      {
        name : "milk",
        count : "5"
      },
      {
        name : "cookies",
        count : "10"
      },
      {
        name : "noodles",
        count : "7"
      },
      {
        name : "chips",
        count : "20"
      },
      {
        name : "eggs",
        count : "30"
      },
      {
        name : "cakes",
        count : "20"
      }
    ];
    service.getItems = function(){
        return boughtItemList;
    };
    service.getListItems = function(){
      return toBuyListItemList;
    };
    service.addItem = function(itemName, counts){
      var item = {
        name : itemName,
        count : counts
      }
      boughtItemList.push(item);
            
    };
    service.addItemToBuy = function(itemName, counts){
      var item = {
        name : itemName,
        count : counts
      }
      toBuyListItemList.push(item);
    };
    service.toBuyRemoveItem = function(index){
      toBuyListItemList.splice(index, 1);
      if(toBuyListItemList.length < minItem){
        throw new Error("Everything is bought!");
      }
      
    };
    service.removeItem = function(index){
      boughtItemList.splice(index, 1);
    };
  }

  function ShoppingServiceProvider(){
    var provider = this;
    
    provider.default = {
      minItems : 1
    };
    provider.$get = function(){
      var ShoppingList = new ShoppingService(provider.default.minItems);
      return ShoppingList;
    }
    

  }    
})();