var linkurl = "http://yourbox.in";
var back = 0;
var filterarray = [];
var changevariable = "";

Array.prototype.remove = function() {
    var what, a = arguments,
        L = a.length,
        ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
};

function alphanumeric(inputtxt) {
    var letterNumber = /^[0-9a-zA-Z]+$/;
    if ((inputtxt.value.match(letterNumber))) {
     
        return true;
    } else {
        alert("message");
        return false;
    }
};

function jsonpara(myObject) {
    return $.param(myObject);
}

angular.module('starter.controllers', ['ionicShop', 'vds.multirange','angularRangeSlider'])
   

.controller('DashCtrl', function($scope, $ionicPopup, $http, $location,$ionicLoading) {

    localStorage.setItem('path', "");
$scope.reg="{'border-bottom':'2px solid black','width':'90%'}" ;
    $scope.doRefresh = function() {
        // Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');

    };


    var email = localStorage.getItem('email');
    var username = localStorage.getItem('username');

    if ((email != null) && (username != null)) {

        $scope.c = "false";

    } else {
        $scope.c = "true";
    }



    $scope.dashback = "{'background-image':'url(img/category.jpg)','background-repeat':'no' }";
    $scope.barstyle = "red";
    $scope.customerdetails = {
        "customer": {
            "email": "",
            "first_name": "",
            "last_name": "",
            "username": "",

            "billing_address": {
                "first_name": "",
                "last_name": "",
                "company": "",
                "address_1": "",
                "address_2": "",
                "city": "",
                "state": "",
                "postcode": "",
                "country": "",
                "email": "",
                "phone": ""
            },
            "shipping_address": {
                "first_name": "",
                "last_name": "",
                "company": "",
                "address_1": "",
                "address_2": "",
                "city": "",
                "state": "",
                "postcode": "",
                "country": ""
            }
        }
    };

    $scope.customerdetailsintial = angular.copy($scope.customerdetails);
    $scope.customersubmit = function() {
        if ((validateEmail($scope.customerdetails.customer.email) == false) || ($scope.customerdetails.customer.username == "")) {
            alert("Username and Email is required");
            return false;
        }
        var str1 = Object.keys($scope.customerdetails.customer).map(function(key) {
            return encodeURIComponent(key) + '=' + encodeURIComponent($scope.customerdetails.customer[key]);
        }).join('&');


        var str = jsonpara($scope.customerdetails.customer);
    

        var req = {
            method: 'GET',
            url: linkurl + '/wc-api/v2/customers/create?' + str


        };
        $http(req).success(function(data) {
           
            localStorage.setItem('customerid', data.customer.id);
            localStorage.setItem('email', $scope.customerdetails.customer.email);
            localStorage.setItem('username', $scope.customerdetails.customer.username);
            alert("success");
           
            window.location.reload(true);




            $scope.customerdetails = angular.copy($scope.customerdetailsintial);
        }).error(function(error) {
       
            alert("error");
        });

    };

  



})

.controller('CategoriesCtrl', function($scope, Chats, $http, $ionicLoading) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});
  $scope.headerclass="50px";

    $scope.dashback = "{'background-image':'url(img/category.jpg)','background-repeat':'no' }";
    $scope.barstyle = "{'display':'none' }";
    $http.get(linkurl + '/wp-json/taxonomies/product_cat/terms?filter[parent]=0').then(function(res) {

        $ionicLoading.hide();
        $scope.cat = res.data;

    })
    $ionicLoading.show({
        template: '<ion-spinner icon="android" ></ion-spinner>'
    });
    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
        Chats.remove(chat);
    }
})

.controller('CategoryDetailCtrl', function($scope, $stateParams, Chats, $http, $ionicLoading, $location, $rootScope, $ionicViewService) {
    var str = $stateParams.catId;
    var param = str.split("+");



    $http.get(linkurl + '/wp-json/taxonomies/product_cat/terms?filter[parent]=' + param[0]).then(function(res) {
        var subcate;

console.log(linkurl + '/wc-api/v2/products?filter[category]=' + param[1]);
        $http.get(linkurl + '/wc-api/v2/products?filter[category]=' + param[1]).then(function(res2) {
            if (res.data.length != 0) {

                subcate = res.data;
                back = 0;

            } else {

                $location.path('/tab/products/' + param[1]);

                back = 1;
                //subcate = res2.data;
            }

            $ionicLoading.hide();
            $scope.subcat = subcate;
        })




    })

    $ionicLoading.show({
        template: '<ion-spinner icon="android"></ion-spinner>'
    });
    $scope.dashback = "{'background-image': 'url(js/1stheadpage.png)','background-repeat':'no' }";
    $scope.viewhead = "{'background-color': 'green' }";
})

.controller('ProductCtrl', function($scope, $stateParams, $rootScope, Chats, $http, $ionicModal, $ionicLoading, $ionicSideMenuDelegate, $location, $ionicPopup, $ionicHistory, $sce, $ionicSlideBoxDelegate,$state) {
 $scope.headerclass="50px";


if($location.path()=='/dash')
{
$scope.myBoolean=false;
}
else
{
$scope.myBoolean=true;
}
 $scope.items = [{
      name  : 'First Item',
      value : 500
    },
    {
      name  : 'Second Item',
      value : 200
    },
    {
      name  : 'Third Item',
      value : 700
    }];

$scope.gotohome=function(){
if ($ionicSideMenuDelegate.isOpen() == true) {

                $scope.showRightMenu();
            };

 $location.path('/tab/categories').replace();  };


$scope.gotoorders=function(){
if ($ionicSideMenuDelegate.isOpen() == true) {

                $scope.showRightMenu();
            };

 $location.path('/myorders').replace();  };
$scope.gotomyaccount=function(){
 if ($ionicSideMenuDelegate.isOpen() == true) {

                $scope.showRightMenu();
            }
$location.path('/myaccount').replace()};
    $scope.rangeArray = [{
            value: 0,
            name: 'MIN_VALUE'
        }, {
            value: 1,
            name: 'MAX_VALUE'
        },

    ]



    filterarray = [];
    $scope.myGoBack = function() {
        if (back == 1) {
            $ionicHistory.goBack(-2);
        } else {
            $ionicHistory.goBack();
        }
    };


    if (($location.path() == "/tab/products/" + $stateParams.prodId) || ($location.path() == "/tab/productlist")) {

        localStorage.setItem('path', $location.path());

    }

    $scope.checkout = function() {
        var text;
        if ($scope.itemdetails.length > 0) {

            text = "Checkout";

        } else {
            text = "Start Shopping";
        }
        return text;
    }
    $scope.barstyle = "{'background-color': 'black'}";
    $ionicModal.fromTemplateUrl('image-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });


    $scope.openModal = function(chat) {
        $scope.modal.show();
        $scope.moreproduct = chat;
  
    };

    $scope.closeModal = function() {
        $scope.modal.hide();
    };

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hide', function() {
        // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
        // Execute action
    });
    $scope.$on('modal.shown', function() {

    });
    $scope.nextSlide = function() {

        $ionicSlideBoxDelegate.next();
    }
    $scope.prevSlide = function() {

        $ionicSlideBoxDelegate.previous();
    }




    $scope.showRightMenu = function() {

        $scope.doRefresh();
      
            $ionicSideMenuDelegate.toggleRight();
    };

    $scope.showLeftMenu = function() {
        $scope.doRefresh();
        if ($state.current.name=="tab.productsonly") {

            $ionicSideMenuDelegate.toggleLeft();
        }

    };
 

       

    $scope.$on("$locationChangeSuccess", function() {

        if (($location.path() == "/tab/products/" + $stateParams.prodId) || ($location.path() == "/tab/productlist")) {

            localStorage.setItem('path', $location.path());

        }


        if (($state.current.name=="tab.productsonly")) {
       if(($location.path()=="/tab/productlist") ||($location.path()=="/tab/categories"))
          {
         $scope.leftdisplay = "block";
             }else
          {

                $scope.leftdisplay = "none";
               }
            } 
        
        else {
                if(($location.path()=="/tab/productlist"))
          {
         $scope.leftdisplay = "block";
             }else
          {

                $scope.leftdisplay = "none";
               }
           }

           


        if (($location.path() != "/tab/account")&&($location.path() != "/tab/checkout")) {
            $scope.rightdisplay = "block";
        } else {
            $scope.rightdisplay = "none";
        }
        $scope.doRefresh();

    });




    linkfull = linkurl + '/wc-api/v2/products?filter[category]=' + $stateParams.prodId;
    $http.get(linkfull).then(function(res) {

            var prod = [];
            $ionicLoading.hide();
            $scope.product = res.data.products;



        })
        //------------------------------------------ng-style toggle button-----------------------------------------------------

    $scope.variation = function(value, k) {

        var result = [];
        if (value.variations.length > 0)

        {

            result[0] = value.variations[0].id;
            result[1] = value.variations[0].price;
            result[2] = value.variations[0].weight + value.variations[0].dimensions.unit;
            result[3] = value.variations[0].image[0].src;
        } else {

            result[0] = 0;
            result[1] = value.price;
            result[2] = value.weight + value.dimensions.unit;
            result[3] = value.featured_src;
        }
        return result[k];
    }

    //-------------------------------------------------filter--------------------------------------------------------------
    $scope.filterprice = function(value) {
        $scope.price = value;
    }
    $scope.$watch('rangeArray', function() {
        $scope.pricefilter();

    });
    $scope.pricefilter = function(chat) {
        var minprice = angular.element(document.getElementById("MIN_VALUE")).text();
        var maxprice = angular.element(document.getElementById("MAX_VALUE")).text();
        var temp;
        if (eval(minprice) > eval(maxprice)) {
            temp = minprice;
            minprice = maxprice;
            maxprice = temp;

        }

        if (chat != null) {

            if ((eval(chat.price) > eval(minprice)) && (eval(chat.price) < eval(maxprice))) {


                return true; // this will be listed in the results
            } else {
                return false;
            }
        }

        return false;

    }
    $scope.searchrefresh = function() {
        var canvas = angular.element(document.getElementById("appBusyIndicator"));
        if (canvas.val() != null) {
            var a = canvas.val();

            if (a.length > 0) {

                if (a.length > 2) {
                    $ionicLoading.show({
                        template: '<ion-spinner icon="android"></ion-spinner>'
                    });

                    $http.get(linkurl + '/wc-api/v2/products?filter[q]=' + a).then(function(res) {


                        $ionicLoading.hide();
                        $scope.productlist = res.data.products;



                    })
                } else {
                    $scope.prodrefresh();

                }
            } else {
                $scope.prodrefresh();

            }
        }
    }

    $scope.change = function(a) {
        $scope.doRefresh();
        changevariable = a;

        if (a.length > 2) {
            $ionicLoading.show({
                template: '<ion-spinner icon="android"></ion-spinner>'
            });

            $http.get(linkurl + '/wc-api/v2/products?filter[q]=' + a).then(function(res) {


                $ionicLoading.hide();
                $scope.productlist = res.data.products;



            })
        } else {
            $scope.productlist = null;

        }
    };
    $scope.doRefresh = function() {
        $scope.searchrefresh();
        if (localStorage.getItem('products') != null) {
            $scope.itemdetails = JSON.parse(localStorage.getItem('products'));
            $scope.changejson();

        }

        // Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');

    };
    $scope.a = [];



    $scope.filtercat = function(cat, check) {

        $location.path(('/tab/productlist/#')).replace();

        if (check == true) {
            $scope.a.push(cat);

        } else {
            $scope.a.remove(cat);


        }
        filterarray = ($scope.a);
     
        $scope.productlist = null;

        if ($scope.a.length > 0) {
            $ionicLoading.show({
                template: '<ion-spinner icon="android"></ion-spinner>'
            });
            $http.get(linkurl + '/wc-api/v2/products?filter[category]=' + $scope.a).then(function(res) {

                $ionicLoading.hide();
                $scope.productlist = res.data.products;


            })
        }
        $location.path(localStorage.getItem('path')).replace();

    };
    $scope.prodrefresh = function() {


        if (filterarray.length > 0) {
            $ionicLoading.show({
                template: '<ion-spinner icon="android"></ion-spinner>'
            });
            $http.get(linkurl + '/wc-api/v2/products?filter[category]=' + filterarray).then(function(res) {

                $ionicLoading.hide();
                $scope.productlist = res.data.products;


            })
        } else {
            $scope.productlist = null;

        }
    }


    //-------------------------

    $http.get(linkurl + '/wp-json/taxonomies/product_cat/terms?').then(function(res) {
        $scope.category = res.data;
    });

    //-----------------------------


    //-----------------logout function()------------------------------

    $scope.logout = function() {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Clear',
            template: 'Are you sure you want to clear cart'
        });
        confirmPopup.then(function(res) {
            if (res) {
                $scope.showRightMenu();
                $scope.itemdetails = [];
                $scope.separateArray = [];
                localStorage.setItem('products', JSON.stringify($scope.itemdetails));
                localStorage.setItem('separateArray', JSON.stringify($scope.separateArray));
                $scope.changejson();
                $location.path("/tab/").replace();
            } else {

            }
        });
    };
    //...................remove from cart............................
    $scope.removefromcart = function(prod_name, cat_id, prod_id, rate, quantity) {

        var i = 0;
console.log($state.current.name);
if(($location.path().trim()=="" )&&(($state.current.name=="tab.productsonly")||($state.current.name=="tab.product")))
{
        $location.path(localStorage.getItem('path')).replace();

}
        angular.forEach($scope.itemdetails, function(todo) {

            if ((todo.cat_id == cat_id) && (todo.prod_id == prod_id) && (todo.rate == rate) && (todo.quantity == quantity) && (i < $scope.itemdetails.length)) {
                $scope.itemdetails.splice(i, 1);


                i = $scope.itemdetails.length + 2;

            }
            i++;
        });
        localStorage.setItem('products', JSON.stringify($scope.itemdetails));
        $scope.changejson();
        localStorage.setItem('separateArray', JSON.stringify($scope.separateArray));
if($location.path()==null)
{
        $location.path(localStorage.getItem('path')).replace();
}

    }

    //..................toggle list................................
    $scope.listbuttontext = "Show List";
    $scope.itemtogglestyle = true;
    $scope.toggleCustom = function() {
        $scope.itemtogglestyle = $scope.itemtogglestyle === false ? true : false;
        $scope.listbuttontext = $scope.itemtogglestyle === true ? "Show List" : "Hide List";
    };
    //...................... code for group json...................................
    $scope.changejson = function() {
        $scope.separateArray = [];

        angular.forEach($scope.itemdetails, function(item, i) {

            var foundItem = false; // track if an item exists in your new array
            if ($scope.separateArray.length > 0) {

                angular.forEach($scope.separateArray, function(newitem, y) {

                    if ((newitem.prod_id == item.prod_id) && (newitem.cat_id == item.cat_id)) {



                        foundItem = true; // notify that the item is found and we dont have to add it
                    }

                });

            }

            if (!foundItem) { // if no item is found
                $scope.separateArray.push({
                    "prod_name": item.prod_name,
                    "cat_id": item.cat_id,
                    "prod_id": item.prod_id,
                    "rate": item.rate,
                    "quantity": item.quantity,
                    "image": item.image
                });
                // push this item into our new array
            }

        });

    }




    //.............product on load........................................
    $scope.itemdetails = [];
    if (localStorage.getItem('products') != null) {
        $scope.itemdetails = JSON.parse(localStorage.getItem('products'));
        $scope.changejson();

    }

    //............add to cart.................................................
    $scope.addtocart = function(prod_name, cat_id, prod_id, rate, quantity, imageurl) {

console.log($state.current.name);
if(($location.path().trim()=="" )&&(($state.current.name=="tab.productsonly")||($state.current.name=="tab.product")))
{
        $location.path(localStorage.getItem('path')).replace();

}
        $scope.itemdetails = [];
        if (localStorage.getItem('products') != null) {
            $scope.itemdetails = JSON.parse(localStorage.getItem('products'));
        }

        $scope.itemdetails.push({
            "prod_name": prod_name,
            "cat_id": cat_id,
            "prod_id": prod_id,
            "rate": rate,
            "quantity": quantity,
            "image": imageurl
        });

        localStorage.setItem('products', JSON.stringify($scope.itemdetails));
        $scope.changejson();
        localStorage.setItem('separateArray', JSON.stringify($scope.separateArray));


    };


    $scope.eachitemdetails = function(item, k) {
        var eachitem = [];
        var count = 0,
            qty = 0,
            rate = 0;;

        angular.forEach($scope.itemdetails, function(todo) {
            if ((todo.cat_id == item.cat_id) && (todo.prod_id == item.prod_id) && (todo.rate == item.rate) && (todo.quantity == item.quantity)) {
                count++;
                rate += eval(todo.rate);
                qty += todo.quantity;
            }
        });
        eachitem[0] = count;
        eachitem[1] = rate;
        eachitem[2] = qty;
        return eachitem[k];

    };

    $scope.eachitemdetailsingle = function(cat_id, prod_id, rate, quantity, k) {

        var eachitem = [];
        var count = 0,
            qty = 0,
            drate = 0;;

        angular.forEach($scope.itemdetails, function(todo) {


            if ((cat_id == todo.cat_id) && (prod_id == todo.prod_id) && (rate == todo.rate) && (quantity == todo.quantity)) {

                count++;
                drate += eval(todo.rate);
                qty += todo.quantity;
            }
        });
        eachitem[0] = count;
        eachitem[1] = drate;
        eachitem[2] = qty;

        return eachitem[k];

    };


    $scope.itemcount = function() {
        var count = 0;
        angular.forEach($scope.itemdetails, function(todo) {
            count++;
        });

        return count;

    };
    $scope.totalamount = function() {
        var total = 0;

        angular.forEach($scope.itemdetails, function(todo) {

            total += eval(todo.rate);
        });

        return total;

    };

    $scope.productfilter = function(chat) {
        var catid;
        angular.forEach(chat.terms.product_cat, function(data) {
            if ($stateParams.prodId == data.slug) {
                catid = data.ID;

            }

        });

        return catid;
    };


    $ionicLoading.show({
        template: '<ion-spinner icon="android"></ion-spinner>'
    });

    $scope.Topayment = function() {

        if ($scope.checkout() == "Checkout") {
            if ($ionicSideMenuDelegate.isOpen() == true) {
                $scope.showRightMenu();
            }
            $location.path("/tab/account").replace()

        } else {
            if ($ionicSideMenuDelegate.isOpen() == true) {
                $scope.showRightMenu();
            }
            $location.path("/tab/categories").replace()
        }
    };


})



.controller('AccountCtrl', function($scope, $stateParams, $rootScope, Chats, $http, $ionicModal, $ionicLoading, $ionicSideMenuDelegate, $location,$state) {


        //.............product on load........................................
        $scope.itemdetails = [];
        if (localStorage.getItem('products') != null) {
            $scope.itemdetails = JSON.parse(localStorage.getItem('products'));
            $scope.changejson();

        }

        $scope.changejson = function() {
            $scope.separateArray = [];

            angular.forEach($scope.itemdetails, function(item, i) {

                var foundItem = false; // track if an item exists in your new array
                if ($scope.separateArray.length > 0) {

                    angular.forEach($scope.separateArray, function(newitem, y) {

                        if ((newitem.prod_id == item.prod_id) && (newitem.cat_id == item.cat_id)) {



                            foundItem = true; // notify that the item is found and we dont have to add it
                        }

                    });
                }

                if (!foundItem) { // if no item is found
                    $scope.separateArray.push({
                        "prod_name": item.prod_name,
                        "cat_id": item.cat_id,
                        "prod_id": item.prod_id,
                        "rate": item.rate,
                        "quantity": item.quantity,
                        "image": item.image
                    });
                    // push this item into our new array
                }

            });


        }
        $scope.totalamount = function() {
            var total = 0;
            angular.forEach($scope.itemdetails, function(todo) {
                total += eval(todo.rate);
            });

            return total;

        };
        $scope.eachitemdetailsingle = function(cat_id, prod_id, rate, quantity, k) {

            var eachitem = [];
            var count = 0,
                qty = 0,
                drate = 0;;

            angular.forEach($scope.itemdetails, function(todo) {


                if ((cat_id == todo.cat_id) && (prod_id == todo.prod_id) && (rate == todo.rate) && (quantity == todo.quantity)) {

                    count++;
                    drate += eval(todo.rate);
                    qty = todo.quantity;
                }
            });
            eachitem[0] = count;
            eachitem[1] = drate;
            eachitem[2] = qty;
            $scope.totalamount();
            return eachitem[k];

        };

        $scope.itemcount = function() {
            var count = 0;
            angular.forEach($scope.itemdetails, function(todo) {
                count++;
            });

            return count;

        };


        $scope.$on("$locationChangeSuccess", function() {
            $scope.doRefresh();
        });



        $scope.doRefresh = function() {
            if (localStorage.getItem('products') != null) {
                $scope.itemdetails = JSON.parse(localStorage.getItem('products'));
                $scope.changejson();

            }
            // Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');

        };
        $scope.checkout = function() {
            $location.path('/tab/checkout').replace();
        };

    })
    .controller('CheckoutCtrl', function($scope, $stateParams, $rootScope, Chats, $http, $ionicModal, $ionicLoading, $ionicSideMenuDelegate, $location,$state,$ionicPopup) {


        var id = localStorage.getItem('customerid');
        $scope.itemdetails = [];
        $scope.itemdetails = JSON.parse(localStorage.getItem('products'));
        $scope.separateArray = JSON.parse(localStorage.getItem('separateArray'));
        $scope.lineitems = [];


        angular.forEach($scope.separateArray, function(item, i) {

            var count = 0;


            angular.forEach($scope.itemdetails, function(newitem, y) {

                if ((newitem.prod_id == item.prod_id) && (newitem.cat_id == item.cat_id)) {

                    count = eval(count) + 1;


                }

            });

            if (item.cat_id != 0) {
                $scope.lineitems.push({
                    "product_id": item.prod_id,
                    "quantity": count,
                    "variations": {
                        "id": item.cat_id
                    }
                });
            } else {
                $scope.lineitems.push({
                    "product_id": item.prod_id,
                    "quantity": count
                });
            }


        });

        $scope.orders = {
            "order": {
                "payment_details": {
                    "method_id": "bacs",
                    "method_title": "Direct Bank Transfer",
                    "paid": true
                },
                "billing_address": {
                    "first_name": "",
                    "last_name": "",
                    "address_1": "",
                    "address_2": "",
                    "city": "",
                    "state": "",
                    "postcode": "",
                    "country": "",
                    "email": "",
                    "phone": "",
                },
                "shipping_address": {
                    "first_name": "",
                    "last_name": "",
                    "address_1": "",
                    "address_2": "",
                    "city": "",
                    "state": "",
                    "postcode": "",
                    "country": "",
                },
                "customer_id": "",
                "line_items": $scope.lineitems,
                "shipping_lines": [{
                    "method_id": "flat_rate",
                    "method_title": "Flat Rate",
                    "total": 10
                }]
            }

        }

        $http.get(linkurl + '/wc-api/v2/customers/' + id).then(function(res) {


            $ionicLoading.hide();
            $scope.customerdetails = res.data.customer;

            $scope.orders.order.customer_id = $scope.customerdetails.id;
            $scope.orders.order.billing_address.first_name = $scope.customerdetails.billing_address.first_name;
            $scope.orders.order.billing_address.last_name = $scope.customerdetails.billing_address.last_name;
            $scope.orders.order.billing_address.address_1 = $scope.customerdetails.billing_address.address_1;
            $scope.orders.order.billing_address.address_2 = $scope.customerdetails.billing_address.address_2;
            $scope.orders.order.billing_address.city = $scope.customerdetails.billing_address.city;
            $scope.orders.order.billing_address.state = $scope.customerdetails.billing_address.state;
            $scope.orders.order.billing_address.postcode = $scope.customerdetails.billing_address.postcode;
            $scope.orders.order.billing_address.email = $scope.customerdetails.billing_address.email;
            $scope.orders.order.billing_address.phone = $scope.customerdetails.billing_address.phone;
           
            $scope.orders.order.shipping_address.first_name = $scope.customerdetails.shipping_address.first_name;
            $scope.orders.order.shipping_address.last_name = $scope.customerdetails.shipping_address.last_name;
            $scope.orders.order.shipping_address.address_1 = $scope.customerdetails.shipping_address.address_1;
            $scope.orders.order.shipping_address.address_2 = $scope.customerdetails.shipping_address.address_2;
            $scope.orders.order.shipping_address.city = $scope.customerdetails.shipping_address.city;
            $scope.orders.order.shipping_address.state = $scope.customerdetails.shipping_address.state;
            $scope.orders.order.shipping_address.postcode = $scope.customerdetails.shipping_address.postcode;
          
        });
        $ionicLoading.show({
            template: '<ion-spinner icon="android"></ion-spinner>'
        });
        $scope.orderproceed = function() {
  $ionicLoading.show({
            template: '<ion-spinner icon="android"></ion-spinner>'
        });
            var str = jsonpara($scope.orders.order);

      


            var req = {
                method: 'GET',
                url: linkurl + '/wc-api/v2/orders/create?' + str,

            };
            $http(req).success(function(data) {
  $ionicLoading.hide();
          var alertPopup =       $ionicPopup.alert({
     title: 'Order',
     template: 'Order Successfully Placed'
   });
  alertPopup.then(function(res) {
            localStorage.removeItem('products');
 localStorage.removeItem('separateArray');
               window.location.reload(true);
   });
            
            });
        }

    })
    .controller('MyaccountCtrl', function($scope, $http,$ionicLoading,$ionicPopup) {


$scope.acc="{'border':'1px solid black','width':'90%', 'color':'#000000','margin':'auto',  'font-weight': 'bold'}" ;

 $scope.headerclass="0px";

        var id = localStorage.getItem('customerid');

        $http.get(linkurl + '/wc-api/v2/customers/' + id).then(function(res) {
            $scope.myaccount = res.data.customer;

        });

        $scope.updatecustomer = function() {
$ionicLoading.show({
        template: '<ion-spinner icon="android"></ion-spinner>'
    });
            $scope.myupdateaccount = {

                "email": $scope.myaccount.email,
                "first_name": $scope.myaccount.first_name,
                "last_name": $scope.myaccount.last_name,
                "username": $scope.myaccount.username,

                "billing_address": {
                    "first_name": $scope.myaccount.billing_address.first_name,
                    "last_name": $scope.myaccount.billing_address.last_name,
                    "company": $scope.myaccount.billing_address.company,
                    "address_1": $scope.myaccount.billing_address.address_1,
                    "address_2": $scope.myaccount.billing_address.address_2,
                    "city": $scope.myaccount.billing_address.city,
                    "state": $scope.myaccount.billing_address.state,
                    "postcode": $scope.myaccount.billing_address.postcode,
                    "country": $scope.myaccount.billing_address.country,
                    "email": $scope.myaccount.billing_address.email,
                    "phone": $scope.myaccount.billing_address.phone
                },
                "shipping_address": {
                    "first_name": $scope.myaccount.shipping_address.first_name,
                    "last_name": $scope.myaccount.shipping_address.last_name,
                    "company": $scope.myaccount.shipping_address.company,
                    "address_1": $scope.myaccount.shipping_address.address_1,
                    "address_2": $scope.myaccount.shipping_address.address_2,
                    "city": $scope.myaccount.shipping_address.city,
                    "state": $scope.myaccount.shipping_address.state,
                    "postcode": $scope.myaccount.shipping_address.postcode,
                    "country": $scope.myaccount.shipping_address.country,
                }

            };
           

            var str = jsonpara($scope.myupdateaccount);


            var req = {
                method: 'GET',
                url: linkurl + '/wc-api/v2/customers/' + id + '/create?' + str


            };
            $http(req).success(function(data) {
               $ionicLoading.hide();
              
                 var alertPopup =       $ionicPopup.alert({
     title: 'My Account',
     template: 'MY Account Successfully Edited'
   });
  alertPopup.then(function(res) {
                window.location.reload(true);




                $scope.customerdetails = angular.copy($scope.customerdetailsintial);
});
            }).error(function(error) {
            
                alert("error");
            });
            
        }

    })
    .controller('MyordersCtrl', function($scope, $http,$ionicLoading) {
        var id = localStorage.getItem('customerid');

  $ionicLoading.show({
        template: '<ion-spinner icon="android"></ion-spinner>'
    });
        $http.get(linkurl + '/wc-api/v2/customers/'+ id+'/orders' ).then(function(res) {
           $ionicLoading.hide();
            $scope.myorderlist = res.data.orders;


        });

    })
    .controller('OrderCtrl', function($scope, $http, $stateParams,$ionicLoading) {
  $ionicLoading.show({
        template: '<ion-spinner icon="android"></ion-spinner>'
    });

        $http.get(linkurl + '/wc-api/v2/orders/' + $stateParams.orderID).then(function(res) {
  $ionicLoading.hide();
            $scope.myorder = res.data.order;
           

        });

    })

.directive('numbersOnly', function() {
    return {
        restrict: 'A',
        link: function(scope, elm, attrs, ctrl) {
            elm.on('keydown', function(event) {
                if ([8, 13, 27, 37, 38, 39, 40].indexOf(event.which) > -1) {
                    // backspace, enter, escape, arrows
                    return true;
                } else if (event.which >= 49 && event.which <= 57) {
                    // numbers
                    return true;
                } else if (event.which >= 96 && event.which <= 105) {
                    // numpad number
                    return true;
                } else if ([110, 190].indexOf(event.which) > -1) {
                    // dot and numpad dot
                    return true;
                } else {
                    event.preventDefault();
                    return false;
                }
            });
        }
    }
});
