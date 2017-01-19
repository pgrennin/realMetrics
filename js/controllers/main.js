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
        // default values
        $scope.valueMaster=100000;
        $scope.noiMaster=10000;
        $scope.capRateCalculatedMaster=10;

        // Reset the default values of the form
        $scope.reset = function() {
                $scope.value = angular.copy($scope.valueMaster);
                $scope.noi = angular.copy($scope.noiMaster);
                $scope.capRateCalculated= angular.copy($scope.capRateCalculatedMaster);
            };
        $scope.reset();

        // Calculate the cap rate
        $scope.calcCapRate = function () {
            $scope.capRateCalculated = ($scope.noi/$scope.value)*100;
            // update graph values
            // $scope.valueGraph[1].v = $scope.value;
            // $scope.noiGraph[1].v = $scope.noi;
            // $scope.capRateGraph[1].v = $scope.capRateCalculated;

            // Assign calculated value to gaugeCapRate
            $scope.gaugeCapRate[1]=$scope.capRateCalculated;
            // $scope.createPieChart();
            // console.log($scope.capRateCalculated);
            
            // update the pie chart after each time this function is called
            // $('.min-chart#chart-sales').data('easyPieChart').update($scope.capRateCalculated);
            // $('#percent-graph-custom').data('easyPieChart').update($scope.capRateCalculated);
             // $('.main-pie').data('easyPieChart').update($scope.capRateCalculated);
             // $('.main-pie').data('easyPieChart').update(90);
             // $('#percent-graph-custom').data('easyPieChart').update($scope.capRateCalculated);
             
             $('#percent-graph-custom-min').data('easyPieChart').update($scope.capRateCalculated);

        }


        //create minimalist pie chart
        // $scope.createPieChart = function () {
        //     $('.min-chart#chart-sales').easyPieChart({
        //                    barColor: "#4caf50",
        //                    // onStep: function (from, to, percent) {
        //                    //     $scope.capRateCalculated.text(Math.round(percent));
        //                    // },
        //                    responsive: true  
        // });
        // }
        // $scope.createPieChart();


        function easyPieChart(selector, trackColor, scaleColor, barColor, lineWidth, lineCap, size) {
            $(selector).easyPieChart({
                trackColor: trackColor,
                scaleColor: scaleColor,
                barColor: barColor,
                lineWidth: lineWidth,
                lineCap: lineCap,
                size: size
            // }).data('easyPieChart').update(scope.capRateCalculated);
            });
        }

        // easyPieChart('#percent-graph-custom', 'rgba(255,255,255,0.2)', 'rgba(255,255,255,0.5)', 'rgba(255,255,255,0.7)', 7, 'butt', 148);
        easyPieChart('#percent-graph-custom-min', '#eee', '#ccc', '#2196F3', 4, 'butt', 95);
        // easyPieChart('.sub-pie-2', '#eee', '#ccc', '#FFC107', 4, 'butt', 95);


            //create instance
           // $('.chart').easyPieChart({
           //     animate: 2000,
           //     trackColor: 'rgba(255,255,255,0.2)',
           //     scaleColor: 'rgba(255,255,255,0.5)',
           //     barColor: 'rgba(255,255,255,0.7)',
           //     lineWidth: 7,
           //     lineCap: 'butt',
           //     size: 148
           // });
           // //update instance after 5 sec
           // setTimeout(function() {
           //     $('.chart').data('easyPieChart').update(40);
           // }, 5000);


           // function easyPieChart(selector, trackColor, scaleColor, barColor, lineWidth, lineCap, size) {
           //     $(selector).easyPieChart({
           //         trackColor: trackColor,
           //         scaleColor: scaleColor,
           //         barColor: barColor,
           //         lineWidth: lineWidth,
           //         lineCap: lineCap,
           //         size: size
           //     // }).data('easyPieChart').update(scope.capRateCalculated);
           //     });
           // }

           // easyPieChart('.main-pie', 'rgba(255,255,255,0.2)', 'rgba(255,255,255,0.5)', 'rgba(255,255,255,0.7)', 7, 'butt', 148);






        // setTimeout(function(){ alert("ran cap rate calculated"); }, 0);

        // // google chart pie chart example
        // $scope.myChartObject = {};
        
        // $scope.myChartObject.type = "PieChart";
        
        // $scope.valueGraph = [
        //     {v: "value"},
        //     {v: 1},
        // ];

        // $scope.noiGraph = [
        //     {v: "noi"},
        //     {v: 1},
        // ];

        // $scope.capRateGraph = [
        //     {v: "cap rate"},
        //     {v: 1},
        // ];

        // $scope.myChartObject.data = {"cols": [
        //     {id: "t", label: "Topping", type: "string"},
        //     {id: "s", label: "Slices", type: "number"}
        // ], "rows": [
        //     // {c: [
        //     //     {v: "Mushrooms"},
        //     //     {v: 3},
        //     // ]},
        //     {c: $scope.valueGraph},
        //     {c: $scope.noiGraph},
        //     {c: $scope.capRateGraph}
        //     // {c: [
        //     //     {v: "Olives"},
        //     //     {v: 31}
        //     // ]}
        //     // {c: [
        //     //     {v: "Zucchini"},
        //     //     {v: 1},
        //     // ]},
        //     // {c: [
        //     //     {v: "Pepperoni"},
        //     //     {v: 2},
        //     // ]}
        // ]};

        // $scope.myChartObject.options = {
        //     'title': 'Cap Rate'
        // };



        // gauge google
        $scope.gaugeChartObject = {};
        $scope.gaugeChartObject.type = "Gauge";

       $scope.gaugeChartObject.options = {
         width: 400,
         height: 180,
         redFrom: 0,
         redTo: 5,
         yellowFrom: 6,
         yellowTo: 10,
         minorTicks: 5
         // NumberFormat:{suffix: '%',pattern:'#'}
       };

       // Set default value
       $scope.gaugeCapRate=['cap rate %', 10];

       $scope.gaugeChartObject.data = [
         ['Label', 'Value'],
         $scope.gaugeCapRate
         // ['CPU', 55]
         // ['Network', 68]
       ];


        // calculate cap rate at page load
        $scope.calcCapRate();

    }) //end controller


    // =========================================================================
    // NOI Controller
    // =========================================================================

    .controller('noiController', function($scope) {
        // default values
        


        // Reset the default values of the form
        $scope.reset = function() {
                $scope.grossScheduledRentIncome=12000;
                $scope.otherIncome=100;
                $scope.totalGrossIncome=$scope.grossScheduledRentIncome+$scope.otherIncome;
                $scope.noi=150;
                $scope.vacancyAndCreditAllowance=600;
                
                //expenses
                $scope.accounting=50;
                $scope.advertising=65;
                $scope.insurance=200;
                $scope.janitorialService=150;
                $scope.lawnsnow=100;
                $scope.legal=0;
                $scope.licenses=0;
                $scope.miscellaneous=50;
                $scope.propertyManagement=0;
                $scope.repairsAndMaintenance=300;
                $scope.residentSuperintendent=0;
                $scope.supplies=100;
                // $scope.taxes=7;
                $scope.realEstate=400;
                $scope.personalProperty=0;
                $scope.payroll=0;
                $scope.otherTax=0;
                $scope.trashRemoval=100;
                // $scope.utilities=7;
                $scope.electricity=0;
                $scope.fuelOil=0;
                $scope.gas=0;
                $scope.sewerAndWater=0;
                $scope.telephone=0;
                $scope.otherUtilities=0;
        };

        // Calculate the noi
        $scope.calcNOI = function () {
            // $scope.calculatedNOI = 150;//($scope.noi/$scope.value)*100;
            $scope.totalGrossIncome=$scope.grossScheduledRentIncome+$scope.otherIncome;
            $scope.grossOperatingIncome=$scope.totalGrossIncome-$scope.vacancyAndCreditAllowance;

            $scope.totalExpenses=$scope.accounting
                                +$scope.advertising
                                +$scope.insurance
                                +$scope.janitorialService
                                +$scope.lawnsnow
                                +$scope.legal
                                +$scope.licenses
                                +$scope.miscellaneous
                                +$scope.propertyManagement
                                +$scope.repairsAndMaintenance
                                +$scope.residentSuperintendent
                                +$scope.supplies
                                // +$scope.taxes
                                +$scope.realEstate
                                +$scope.personalProperty
                                +$scope.payroll
                                +$scope.otherTax
                                +$scope.trashRemoval
                                // +$scope.utilities
                                +$scope.electricity
                                +$scope.fuelOil
                                +$scope.gas
                                +$scope.sewerAndWater
                                +$scope.telephone
                                +$scope.otherUtilities
                                ;
            
            $scope.noi=$scope.grossOperatingIncome - $scope.totalExpenses;

            //Income Pie Chart
            $scope.grossScheduledIncomeGraph[1].v = $scope.grossScheduledRentIncome;
            $scope.otherIncomeGraph[1].v=$scope.otherIncome;
            // $scope.vacancyAndCreditAllowanceGraph[1].v=$scope.vacancyAndCreditAllowance;

            //Expense Chart
            $scope.accountingExpensePieChart[1].v = $scope.accounting;
            $scope.advertisingExpensePieChart[1].v = $scope.advertising;
            $scope.insuranceExpensePieChart[1].v = $scope.insurance;
            $scope.janitorialServiceExpensePieChart[1].v = $scope.janitorialService;
            $scope.lawnsnowExpensePieChart[1].v = $scope.lawnsnow;
            $scope.legalExpensePieChart[1].v = $scope.legal;
            $scope.licensesExpensePieChart[1].v = $scope.licenses;
            $scope.miscellaneousExpensePieChart[1].v = $scope.miscellaneous;
            $scope.propertyManagementExpensePieChart[1].v = $scope.propertyManagement;
            $scope.repairsAndMaintenanceExpensePieChart[1].v = $scope.repairsAndMaintenance;
            $scope.residentSuperintendentExpensePieChart[1].v = $scope.residentSuperintendent;
            $scope.suppliesExpensePieChart[1].v = $scope.supplies;
            $scope.realEstateExpensePieChart[1].v = $scope.realEstate;
            $scope.personalPropertyExpensePieChart[1].v = $scope.personalProperty;
            $scope.payrollExpensePieChart[1].v = $scope.payroll;
            $scope.otherTaxExpensePieChart[1].v = $scope.otherTax;
            $scope.trashRemovalExpensePieChart[1].v = $scope.trashRemoval;
            $scope.electricityExpensePieChart[1].v = $scope.electricity;
            $scope.fuelOilExpensePieChart[1].v = $scope.fuelOil;
            $scope.gasExpensePieChart[1].v = $scope.gas;
            $scope.sewerAndWaterExpensePieChart[1].v = $scope.sewerAndWater;
            $scope.telephoneExpensePieChart[1].v = $scope.telephone;
            $scope.otherUtilitiesExpensePieChart[1].v = $scope.otherUtilities;
            
        }


        // INCOME CHART OBJECT *****************
        $scope.incomeChartObject = {};
            
            $scope.incomeChartObject.type = "PieChart";
            
            
            $scope.grossScheduledIncomeGraph = [
                {v: "Total Gross Income"},
                {v: 1},
            ];
            // $scope.grossScheduledIncomeGraph[1].v = $scope.grossScheduledRentIncome;

            $scope.otherIncomeGraph = [
                {v: "Other Income"},
                {v: 1},
            ];

            $scope.vacancyAndCreditAllowanceGraph = [
                {v: "Vacancy/Credit Allowance"},
                {v: 1},
            ];
            // $scope.onions[1].v =$scope.grossScheduledRentIncome;
            // console.log($scope.onions);

            $scope.incomeChartObject.data = {"cols": [
                {id: "a", label: "label", type: "string"},
                {id: "b", label: "amount", type: "number"}
            ], "rows": [
                {c: $scope.grossScheduledIncomeGraph},
                {c: $scope.otherIncomeGraph}
                // {c: $scope.vacancyAndCreditAllowanceGraph}
            ]};

            $scope.incomeChartObject.options = {
                'title': 'Income',
                'pieHole': 0.5
            };
        // **********************************
        // expenseChartObject
        $scope.expenseChartObject = {};
            
            $scope.expenseChartObject.type = "PieChart";
            
            // Expenses
            $scope.accountingExpensePieChart =[{v: "expenseName"}, {v:1}];
            $scope.advertisingExpensePieChart =[{v: "expenseName"}, {v:1}];
            $scope.insuranceExpensePieChart =[{v: "expenseName"}, {v:1}];
            $scope.janitorialServiceExpensePieChart =[{v: "expenseName"}, {v:1}];
            $scope.lawnsnowExpensePieChart =[{v: "expenseName"}, {v:1}];
            $scope.legalExpensePieChart =[{v: "expenseName"}, {v:1}];
            $scope.licensesExpensePieChart =[{v: "expenseName"}, {v:1}];
            $scope.miscellaneousExpensePieChart =[{v: "expenseName"}, {v:1}];
            $scope.propertyManagementExpensePieChart =[{v: "expenseName"}, {v:1}];
            $scope.repairsAndMaintenanceExpensePieChart =[{v: "expenseName"}, {v:1}];
            $scope.residentSuperintendentExpensePieChart =[{v: "expenseName"}, {v:1}];
            $scope.suppliesExpensePieChart =[{v: "expenseName"}, {v:1}];
            $scope.realEstateExpensePieChart =[{v: "expenseName"}, {v:1}];
            $scope.personalPropertyExpensePieChart =[{v: "expenseName"}, {v:1}];
            $scope.payrollExpensePieChart =[{v: "expenseName"}, {v:1}];
            $scope.otherTaxExpensePieChart =[{v: "expenseName"}, {v:1}];
            $scope.trashRemovalExpensePieChart =[{v: "expenseName"}, {v:1}];
            $scope.electricityExpensePieChart =[{v: "expenseName"}, {v:1}];
            $scope.fuelOilExpensePieChart =[{v: "expenseName"}, {v:1}];
            $scope.gasExpensePieChart =[{v: "expenseName"}, {v:1}];
            $scope.sewerAndWaterExpensePieChart =[{v: "expenseName"}, {v:1}];
            $scope.telephoneExpensePieChart =[{v: "expenseName"}, {v:1}];
            $scope.otherUtilitiesExpensePieChart =[{v: "expenseName"}, {v:1}];

            $scope.expenseChartObject.data = {"cols": [
                {id: "a", label: "label", type: "string"},
                {id: "b", label: "amount", type: "number"}
            ], "rows": [
                {c: $scope.accountingExpensePieChart}, 
                {c: $scope.advertisingExpensePieChart}, 
                {c: $scope.insuranceExpensePieChart}, 
                {c: $scope.janitorialServiceExpensePieChart}, 
                {c: $scope.lawnsnowExpensePieChart}, 
                {c: $scope.legalExpensePieChart}, 
                {c: $scope.licensesExpensePieChart}, 
                {c: $scope.miscellaneousExpensePieChart}, 
                {c: $scope.propertyManagementExpensePieChart}, 
                {c: $scope.repairsAndMaintenanceExpensePieChart}, 
                {c: $scope.residentSuperintendentExpensePieChart}, 
                {c: $scope.suppliesExpensePieChart}, 
                {c: $scope.realEstateExpensePieChart}, 
                {c: $scope.personalPropertyExpensePieChart}, 
                {c: $scope.payrollExpensePieChart}, 
                {c: $scope.otherTaxExpensePieChart}, 
                {c: $scope.trashRemovalExpensePieChart}, 
                {c: $scope.electricityExpensePieChart}, 
                {c: $scope.fuelOilExpensePieChart}, 
                {c: $scope.gasExpensePieChart}, 
                {c: $scope.sewerAndWaterExpensePieChart}, 
                {c: $scope.telephoneExpensePieChart}, 
                {c: $scope.otherUtilitiesExpensePieChart} 
            ]};

            $scope.expenseChartObject.options = {
                'title': 'Expenses',
                'pieHole': 0.5
            };
        // #################################################################


        // reset to default values at page load
        $scope.reset();
        // calculate cap rate at page load
        $scope.calcNOI();

    }) //end controller


    