materialAdmin
    // =========================================================================
    // Base controller for common functions
    // =========================================================================

    .controller('materialadminCtrl', function($timeout, $state, $scope, growlService){
        //Welcome Message
        // growlService.growl('Welcome back Mallinda!', 'inverse')
        
        
        // Detact Mobile Browser
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
           angular.element('html').addClass('ismobile');
        }

        // By default Sidbars are hidden in boxed layout and in wide layout only the right sidebar is hidden.
        this.sidebarToggle = {
            left: false,
            right: false
        }

        // By default template has a boxed layout
        this.layoutType = localStorage.getItem('ma-layout-status');
        
        // For Mainmenu Active Class
        this.$state = $state;    
        
        //Close sidebar on click
        this.sidebarStat = function(event) {
            if (!angular.element(event.target).parent().hasClass('active')) {
                this.sidebarToggle.left = false;
            }
        }
        
        //Listview Search (Check listview pages)
        this.listviewSearchStat = false;
        
        this.lvSearch = function() {
            this.listviewSearchStat = true; 
        }
        
        //Listview menu toggle in small screens
        this.lvMenuStat = false;
        
        //Blog
        this.wallCommenting = [];
        
        this.wallImage = false;
        this.wallVideo = false;
        this.wallLink = false;

        //Skin Switch
        this.currentSkin = 'blue';

        this.skinList = [
            'lightblue',
            'bluegray',
            'cyan',
            'teal',
            'green',
            'orange',
            'blue',
            'purple'
        ]

        this.skinSwitch = function (color) {
            this.currentSkin = color;
        }
    
    })


    // =========================================================================
    // Header
    // =========================================================================
    .controller('headerCtrl', function($timeout, messageService){


        // Top Search
        this.openSearch = function(){
            angular.element('#header').addClass('search-toggled');
            angular.element('#top-search-wrap').find('input').focus();
        }

        this.closeSearch = function(){
            angular.element('#header').removeClass('search-toggled');
        }
        
        // Get messages and notification for header
        this.img = messageService.img;
        this.user = messageService.user;
        this.user = messageService.text;

        this.messageResult = messageService.getMessage(this.img, this.user, this.text);


        //Clear Notification
        this.clearNotification = function($event) {
            $event.preventDefault();
            
            var x = angular.element($event.target).closest('.listview');
            var y = x.find('.lv-item');
            var z = y.size();
            
            angular.element($event.target).parent().fadeOut();
            
            x.find('.list-group').prepend('<i class="grid-loading hide-it"></i>');
            x.find('.grid-loading').fadeIn(1500);
            var w = 0;
            
            y.each(function(){
                var z = $(this);
                $timeout(function(){
                    z.addClass('animated fadeOutRightBig').delay(1000).queue(function(){
                        z.remove();
                    });
                }, w+=150);
            })
            
            $timeout(function(){
                angular.element('#notifications').addClass('empty');
            }, (z*150)+200);
        }
        
        // Clear Local Storage
        this.clearLocalStorage = function() {
            
            //Get confirmation, if confirmed clear the localStorage
            swal({   
                title: "Are you sure?",   
                text: "All your saved localStorage values will be removed",   
                type: "warning",   
                showCancelButton: true,   
                confirmButtonColor: "#F44336",   
                confirmButtonText: "Yes, delete it!",   
                closeOnConfirm: false 
            }, function(){
                localStorage.clear();
                swal("Done!", "localStorage is cleared", "success"); 
            });
            
        }
        
        //Fullscreen View
        this.fullScreen = function() {
            //Launch
            function launchIntoFullscreen(element) {
                if(element.requestFullscreen) {
                    element.requestFullscreen();
                } else if(element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if(element.webkitRequestFullscreen) {
                    element.webkitRequestFullscreen();
                } else if(element.msRequestFullscreen) {
                    element.msRequestFullscreen();
                }
            }

            //Exit
            function exitFullscreen() {
                if(document.exitFullscreen) {
                    document.exitFullscreen();
                } else if(document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if(document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }
            }

            if (exitFullscreen()) {
                launchIntoFullscreen(document.documentElement);
            }
            else {
                launchIntoFullscreen(document.documentElement);
            }
        }
    
    })



    // =========================================================================
    // Best Selling Widget
    // =========================================================================

    .controller('bestsellingCtrl', function(bestsellingService){
        // Get Best Selling widget Data
        this.img = bestsellingService.img;
        this.name = bestsellingService.name;
        this.range = bestsellingService.range; 
        
        this.bsResult = bestsellingService.getBestselling(this.img, this.name, this.range);
    })

 
    // =========================================================================
    // Todo List Widget
    // =========================================================================

    .controller('todoCtrl', function(todoService){
        
        //Get Todo List Widget Data
        this.todo = todoService.todo;
        
        this.tdResult = todoService.getTodo(this.todo);
        
        //Add new Item (closed by default)
        this.addTodoStat = false;
    })


    // =========================================================================
    // Recent Items Widget
    // =========================================================================

    .controller('recentitemCtrl', function(recentitemService){
        
        //Get Recent Items Widget Data
        this.id = recentitemService.id;
        this.name = recentitemService.name;
        this.parseInt = recentitemService.price;
        
        this.riResult = recentitemService.getRecentitem(this.id, this.name, this.price);
    })


    // =========================================================================
    // Recent Posts Widget
    // =========================================================================
    
    .controller('recentpostCtrl', function(recentpostService){
        
        //Get Recent Posts Widget Items
        this.img = recentpostService.img;
        this.user = recentpostService.user;
        this.text = recentpostService.text;
        
        this.rpResult = recentpostService.getRecentpost(this.img, this.user, this.text);
    })


    //=================================================
    // Profile
    //=================================================

    .controller('profileCtrl', function(growlService){
        
        //Get Profile Information from profileService Service
        
        //User
        this.profileSummary = "Sed eu est vulputate, fringilla ligula ac, maximus arcu. Donec sed felis vel magna mattis ornare ut non turpis. Sed id arcu elit. Sed nec sagittis tortor. Mauris ante urna, ornare sit amet mollis eu, aliquet ac ligula. Nullam dolor metus, suscipit ac imperdiet nec, consectetur sed ex. Sed cursus porttitor leo.";
    
        this.fullName = "Mallinda Hollaway";
        this.gender = "female";
        this.birthDay = "23/06/1988";
        this.martialStatus = "Single";
        this.mobileNumber = "00971123456789";
        this.emailAddress = "malinda.h@gmail.com";
        this.twitter = "@malinda";
        this.twitterUrl = "twitter.com/malinda";
        this.skype = "malinda.hollaway";
        this.addressSuite = "44-46 Morningside Road";
        this.addressCity = "Edinburgh";
        this.addressCountry = "Scotland";

        //Edit
        this.editSummary = 0;
        this.editInfo = 0;
        this.editContact = 0;
    
        
        this.submit = function(item, message) {            
            if(item === 'profileSummary') {
                this.editSummary = 0;
            }
            
            if(item === 'profileInfo') {
                this.editInfo = 0;
            }
            
            if(item === 'profileContact') {
                this.editContact = 0;
            }
            
            growlService.growl(message+' has updated Successfully!', 'inverse'); 
        }

    })



    //=================================================
    // LOGIN
    //=================================================

    .controller('loginCtrl', function(){
        
        //Status
    
        this.login = 1;
        this.register = 0;
        this.forgot = 0;
    })


    //=================================================
    // CALENDAR
    //=================================================
    
    .controller('calendarCtrl', function($modal){
    
        //Create and add Action button with dropdown in Calendar header. 
        this.month = 'month';
    
        this.actionMenu = '<ul class="actions actions-alt" id="fc-actions">' +
                            '<li class="dropdown" dropdown>' +
                                '<a href="" dropdown-toggle><i class="zmdi zmdi-more-vert"></i></a>' +
                                '<ul class="dropdown-menu dropdown-menu-right">' +
                                    '<li class="active">' +
                                        '<a data-calendar-view="month" href="">Month View</a>' +
                                    '</li>' +
                                    '<li>' +
                                        '<a data-calendar-view="basicWeek" href="">Week View</a>' +
                                    '</li>' +
                                    '<li>' +
                                        '<a data-calendar-view="agendaWeek" href="">Agenda Week View</a>' +
                                    '</li>' +
                                    '<li>' +
                                        '<a data-calendar-view="basicDay" href="">Day View</a>' +
                                    '</li>' +
                                    '<li>' +
                                        '<a data-calendar-view="agendaDay" href="">Agenda Day View</a>' +
                                    '</li>' +
                                '</ul>' +
                            '</div>' +
                        '</li>';

            
        //Open new event modal on selecting a day
        this.onSelect = function(argStart, argEnd) {            
            var modalInstance  = $modal.open({
                templateUrl: 'addEvent.html',
                controller: 'addeventCtrl',
                backdrop: 'static',
                keyboard: false,
                resolve: {
                    calendarData: function() {
                        var x = [argStart, argEnd];
                        return x;
                    }
                }
            });
        }
    })

    //Add event Controller (Modal Instance)
    .controller('addeventCtrl', function($scope, $modalInstance, calendarData){
        
        //Calendar Event Data
        $scope.calendarData = {
            eventStartDate: calendarData[0],
            eventEndDate:  calendarData[1]
        };
    
        //Tags
        $scope.tags = [
            'bgm-teal',
            'bgm-red',
            'bgm-pink',
            'bgm-blue',
            'bgm-lime',
            'bgm-green',
            'bgm-cyan',
            'bgm-orange',
            'bgm-purple',
            'bgm-gray',
            'bgm-black',
        ]
        
        //Select Tag
        $scope.currentTag = '';
        
        $scope.onTagClick = function(tag, $index) {
            $scope.activeState = $index;
            $scope.activeTagColor = tag;
        } 
        
        //Add new event
        $scope.addEvent = function() {
            if ($scope.calendarData.eventName) {

                //Render Event
                $('#calendar').fullCalendar('renderEvent',{
                    title: $scope.calendarData.eventName,
                    start: $scope.calendarData.eventStartDate,
                    end:  $scope.calendarData.eventEndDate,
                    allDay: true,
                    className: $scope.activeTagColor

                },true ); //Stick the event

                $scope.activeState = -1;
                $scope.calendarData.eventName = '';     
                $modalInstance.close();
            }
        }
        
        //Dismiss 
        $scope.eventDismiss = function() {
            $modalInstance.dismiss();
        }
    })

    // =========================================================================
    // COMMON FORMS
    // =========================================================================

    .controller('formCtrl', function(){
    
        //Input Slider
        this.nouisliderValue = 4;
        this.nouisliderFrom = 25;
        this.nouisliderTo = 80;
        this.nouisliderRed = 35;
        this.nouisliderBlue = 90;
        this.nouisliderCyan = 20;
        this.nouisliderAmber = 60;
        this.nouisliderGreen = 75;
    
        //Color Picker
        this.color = '#03A9F4';
        this.color2 = '#8BC34A';
        this.color3 = '#F44336';
        this.color4 = '#FFC107';
    })


    // =========================================================================
    // PHOTO GALLERY
    // =========================================================================

    .controller('photoCtrl', function(){
        
        //Default grid size (2)
        this.photoColumn = 'col-md-2';
        this.photoColumnSize = 2;
    
        this.photoOptions = [
            { value: 2, column: 6 },
            { value: 3, column: 4 },
            { value: 4, column: 3 },
            { value: 1, column: 12 },
        ]
    
        //Change grid
        this.photoGrid = function(size) {
            this.photoColumn = 'col-md-'+size;
            this.photoColumnSize = size;
        }
    
    })


    // =========================================================================
    // ANIMATIONS DEMO
    // =========================================================================
    .controller('animCtrl', function($timeout){
        
        //Animation List
        this.attentionSeekers = [
            { animation: 'bounce', target: 'attentionSeeker' },
            { animation: 'flash', target: 'attentionSeeker' },
            { animation: 'pulse', target: 'attentionSeeker' },
            { animation: 'rubberBand', target: 'attentionSeeker' },
            { animation: 'shake', target: 'attentionSeeker' },
            { animation: 'swing', target: 'attentionSeeker' },
            { animation: 'tada', target: 'attentionSeeker' },
            { animation: 'wobble', target: 'attentionSeeker' }
        ]
        this.flippers = [
            { animation: 'flip', target: 'flippers' },
            { animation: 'flipInX', target: 'flippers' },
            { animation: 'flipInY', target: 'flippers' },
            { animation: 'flipOutX', target: 'flippers' },
            { animation: 'flipOutY', target: 'flippers'  }
        ]
         this.lightSpeed = [
            { animation: 'lightSpeedIn', target: 'lightSpeed' },
            { animation: 'lightSpeedOut', target: 'lightSpeed' }
        ]
        this.special = [
            { animation: 'hinge', target: 'special' },
            { animation: 'rollIn', target: 'special' },
            { animation: 'rollOut', target: 'special' }
        ]
        this.bouncingEntrance = [
            { animation: 'bounceIn', target: 'bouncingEntrance' },
            { animation: 'bounceInDown', target: 'bouncingEntrance' },
            { animation: 'bounceInLeft', target: 'bouncingEntrance' },
            { animation: 'bounceInRight', target: 'bouncingEntrance' },
            { animation: 'bounceInUp', target: 'bouncingEntrance'  }
        ]
        this.bouncingExits = [
            { animation: 'bounceOut', target: 'bouncingExits' },
            { animation: 'bounceOutDown', target: 'bouncingExits' },
            { animation: 'bounceOutLeft', target: 'bouncingExits' },
            { animation: 'bounceOutRight', target: 'bouncingExits' },
            { animation: 'bounceOutUp', target: 'bouncingExits'  }
        ]
        this.rotatingEntrances = [
            { animation: 'rotateIn', target: 'rotatingEntrances' },
            { animation: 'rotateInDownLeft', target: 'rotatingEntrances' },
            { animation: 'rotateInDownRight', target: 'rotatingEntrances' },
            { animation: 'rotateInUpLeft', target: 'rotatingEntrances' },
            { animation: 'rotateInUpRight', target: 'rotatingEntrances'  }
        ]
        this.rotatingExits = [
            { animation: 'rotateOut', target: 'rotatingExits' },
            { animation: 'rotateOutDownLeft', target: 'rotatingExits' },
            { animation: 'rotateOutDownRight', target: 'rotatingExits' },
            { animation: 'rotateOutUpLeft', target: 'rotatingExits' },
            { animation: 'rotateOutUpRight', target: 'rotatingExits'  }
        ]
        this.fadeingEntrances = [
            { animation: 'fadeIn', target: 'fadeingEntrances' },
            { animation: 'fadeInDown', target: 'fadeingEntrances' },
            { animation: 'fadeInDownBig', target: 'fadeingEntrances' },
            { animation: 'fadeInLeft', target: 'fadeingEntrances' },
            { animation: 'fadeInLeftBig', target: 'fadeingEntrances'  },
            { animation: 'fadeInRight', target: 'fadeingEntrances'  },
            { animation: 'fadeInRightBig', target: 'fadeingEntrances'  },
            { animation: 'fadeInUp', target: 'fadeingEntrances'  },
            { animation: 'fadeInBig', target: 'fadeingEntrances'  }
        ]
        this.fadeingExits = [
            { animation: 'fadeOut', target: 'fadeingExits' },
            { animation: 'fadeOutDown', target: 'fadeingExits' },
            { animation: 'fadeOutDownBig', target: 'fadeingExits' },
            { animation: 'fadeOutLeft', target: 'fadeingExits' },
            { animation: 'fadeOutLeftBig', target: 'fadeingExits'  },
            { animation: 'fadeOutRight', target: 'fadeingExits'  },
            { animation: 'fadeOutRightBig', target: 'fadeingExits'  },
            { animation: 'fadeOutUp', target: 'fadeingExits'  },
            { animation: 'fadeOutUpBig', target: 'fadeingExits'  }
        ]
        this.zoomEntrances = [
            { animation: 'zoomIn', target: 'zoomEntrances' },
            { animation: 'zoomInDown', target: 'zoomEntrances' },
            { animation: 'zoomInLeft', target: 'zoomEntrances' },
            { animation: 'zoomInRight', target: 'zoomEntrances' },
            { animation: 'zoomInUp', target: 'zoomEntrances'  }
        ]
        this.zoomExits = [
            { animation: 'zoomOut', target: 'zoomExits' },
            { animation: 'zoomOutDown', target: 'zoomExits' },
            { animation: 'zoomOutLeft', target: 'zoomExits' },
            { animation: 'zoomOutRight', target: 'zoomExits' },
            { animation: 'zoomOutUp', target: 'zoomExits'  }
        ]

        //Animate    
        this.ca = '';
    
        this.setAnimation = function(animation, target) {
            if (animation === "hinge") {
                animationDuration = 2100;
            }
            else {
                animationDuration = 1200;
            }
            
            angular.element('#'+target).addClass(animation);
            
            $timeout(function(){
                angular.element('#'+target).removeClass(animation);
            }, animationDuration);
        }
    
    })

    // =========================================================================
    // shopping test
    // =========================================================================

    .controller("shoppingCtrl", function($scope) {
        $scope.products = ["Milk", "Bread", "Cheese"];
        $scope.addItem = function () {
            $scope.errortext = "";
            if (!$scope.addMe) {return;}
            if ($scope.products.indexOf($scope.addMe) == -1) {
                $scope.products.push($scope.addMe);
            } else {
                $scope.errortext = "The item is already in your shopping list.";
            }
        }
        $scope.removeItem = function (x) {
            $scope.errortext = "";
            $scope.products.splice(x, 1);
        } 
    })

    // =========================================================================
    // capRate graph 
    // =========================================================================

    .controller('capRateGraphController', function($scope) {
      // $scope.chartValue='210000';

      // $scope.$watch('myModel', function() { ... }, true);

       // $scope.$watch("chartValue", function(newValue, oldValue) {
       //   if ($scope.chartValue.length > 0) {
       //      // $scope.greeting = "Greetings " + $scope.name

       //   }
       // });

        // $scope.dataSource = {
        //     "chart": {
        //         "manageresize": "1",
        //         "origw": "400",
        //         "origh": "250",
        //         "managevalueoverlapping": "1",
        //         "autoaligntickvalues": "1",
        //         "bgcolor": "AEC0CA,FFFFFF",
        //         "fillangle": "45",
        //         "upperlimit": "100",
        //         "lowerlimit": "0",
        //         "majortmnumber": "10",
        //         "majortmheight": "8",
        //         "showgaugeborder": "0",
        //         "gaugeouterradius": "140",
        //         "gaugeoriginx": "205",
        //         "gaugeoriginy": "206",
        //         "gaugeinnerradius": "2",
        //         "formatnumberscale": "1",
        //         "numberprefix": "",
        //         "decmials": "2",
        //         "tickmarkdecimals": "1",
        //         "pivotradius": "17",
        //         "showpivotborder": "1",
        //         "pivotbordercolor": "000000",
        //         "pivotborderthickness": "5",
        //         "pivotfillmix": "FFFFFF,000000",
        //         "tickvaluedistance": "10",
        //         "showborder": "0"
        //     },
        //     "colorrange": {
        //         "color": [
        //             {
        //                 "minvalue": "0",
        //                 "maxvalue": "10",
        //                 "code": "B41527"
        //             },
        //             {
        //                 "minvalue": "20",
        //                 "maxvalue": "30",
        //                 "code": "E48739"
        //             },
        //             {
        //                 "minvalue": "30",
        //                 "maxvalue": "40",
        //                 "code": "399E38"
        //             }
        //         ]
        //     },
        //     "dials": {
        //         "dial": [
        //             {
        //                 // **value
        //                 "value": '0',
        //                 "borderalpha": "0",
        //                 "bgcolor": "000000",
        //                 "basewidth": "28",
        //                 "topwidth": "1",
        //                 "radius": "130"
        //             }
        //         ]
        //     },
        //     "annotations": {
        //         "groups": [
        //             {
        //                 "x": "205",
        //                 "y": "207.5",
        //                 "items": [
        //                     {
        //                         "type": "circle",
        //                         "x": "0",
        //                         "y": "2.5",
        //                         "radius": "150",
        //                         "startangle": "0",
        //                         "endangle": "180",
        //                         "fillpattern": "linear",
        //                         "fillasgradient": "1",
        //                         "fillcolor": "dddddd,666666",
        //                         "fillalpha": "100,100",
        //                         "fillratio": "50,50",
        //                         "fillangle": "0",
        //                         "showborder": "1",
        //                         "bordercolor": "444444",
        //                         "borderthickness": "2"
        //                     },
        //                     {
        //                         "type": "circle",
        //                         "x": "0",
        //                         "y": "0",
        //                         "radius": "145",
        //                         "startangle": "0",
        //                         "endangle": "180",
        //                         "fillpattern": "linear",
        //                         "fillasgradient": "1",
        //                         "fillcolor": "666666,ffffff",
        //                         "fillalpha": "100,100",
        //                         "fillratio": "50,50",
        //                         "fillangle": "0"
        //                     }
        //                 ]
        //             }
        //         ]
        //     }
        // }


        // $scope.updateChart = function () {
        //     // $scope.errortext = "";
        //     $scope.dataSource.dials.dial.value='2000000';
        // }

        // $scope.pieChartPercent = ($scope.noi/$scope.value)*100;
        // alert($scope.pieChartPercent);

        // updaate the data-percen property of pie chart
        // var el =angular.element('#capRatePie');
        // el.attr('data-percent', ($scope.noi/$scope.value)*100);
        // $compile('#capRatePie')(scope);

        // $("#capRatePie").html(
        //   $compile(
        //     "<div id='capRatePie' class='easy-pie sub-pie-1' data-percent='{{(noi/value)*100 |number:2}}'  data-easypie-chart>"
        //   )(scope)
        // );

        // create function to caclulate cap rate
        // $scope.noi=1;
        // $scope.value=1;
        // $scope.capRateCalculated=1

        // $scope.value=1;
        // $scope.noi=1;
        // $scope.capRateCalculated=1;

        $scope.calcCapRate = function () {
            $scope.capRateCalculated = ($scope.noi/$scope.value)*100;

            // assign calculated value to data in chart
            // $scope.myChartObject.data.rows[0].c[1] =  $scope.capRateCalculated;
            
            // update graph values
            $scope.valueGraph[1].v = $scope.value;
            $scope.noiGraph[1].v = $scope.noi;
            $scope.capRateGraph[1].v = $scope.capRateCalculated;


        }

        // updateNoi

        // $scope.calcCapRate = function () {
        //     $scope.capRateCalculated = ($scope.noi/$scope.value)*100;

        //     // assign calculated value to data in chart
        //     // $scope.myChartObject.data.rows[0].c[1] =  $scope.capRateCalculated;
            
        //     // update graph values
        //     $scope.valueGraph[1].v = $scope.value;
        //     $scope.noiGraph[1].v = $scope.noiGraph;

        // }


        // google chart
        $scope.myChartObject = {};
        
        $scope.myChartObject.type = "PieChart";
        
        $scope.valueGraph = [
            {v: "value"},
            {v: 1},
        ];

        $scope.noiGraph = [
            {v: "noi"},
            {v: 1},
        ];

        $scope.capRateGraph = [
            {v: "cap rate"},
            {v: 1},
        ];


        $scope.myChartObject.data = {"cols": [
            {id: "t", label: "Topping", type: "string"},
            {id: "s", label: "Slices", type: "number"}
        ], "rows": [
            // {c: [
            //     {v: "Mushrooms"},
            //     {v: 3},
            // ]},
            {c: $scope.valueGraph},
            {c: $scope.noiGraph},
            {c: $scope.capRateGraph}
            // {c: [
            //     {v: "Olives"},
            //     {v: 31}
            // ]}
            // {c: [
            //     {v: "Zucchini"},
            //     {v: 1},
            // ]},
            // {c: [
            //     {v: "Pepperoni"},
            //     {v: 2},
            // ]}
        ]};

        $scope.myChartObject.options = {
            'title': 'Cap Rate'
        };



       




        // $scope.addItem = function () {
        //     $scope.errortext = "";
        //     if (!$scope.addMe) {return;}
        //     if ($scope.products.indexOf($scope.addMe) == -1) {
        //         $scope.products.push($scope.addMe);
        //     } else {
        //         $scope.errortext = "The item is already in your shopping list.";
        //     }
        // }
        // $scope.removeItem = function (x) {
        //     $scope.errortext = "";
        //     $scope.products.splice(x, 1);
        // } 

    }) //end controller

    // Google chart controller
    // .controller("googleChartController", function ($scope) {
    //     $scope.myChartObject = {};
        
    //     $scope.myChartObject.type = "PieChart";
        
    //     $scope.onions = [
    //         {v: "Onions"},
    //         {v: 3},
    //     ];

    //     $scope.myChartObject.data = {"cols": [
    //         {id: "t", label: "Topping", type: "string"},
    //         {id: "s", label: "Slices", type: "number"}
    //     ], "rows": [
    //         {c: [
    //             {v: "Mushrooms"},
    //             {v: 3},
    //         ]},
    //         {c: $scope.onions},
    //         {c: [
    //             {v: "Olives"},
    //             {v: 31}
    //         ]},
    //         {c: [
    //             {v: "Zucchini"},
    //             {v: 1},
    //         ]},
    //         {c: [
    //             {v: "Pepperoni"},
    //             {v: 2},
    //         ]}
    //     ]};

    //     $scope.myChartObject.options = {
    //         'title': 'How Much Pizza I Ate Last Night'
    //     };
    // });

