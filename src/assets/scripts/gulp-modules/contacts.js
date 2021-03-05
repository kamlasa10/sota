$(document).ready(() => {
  class TabChange {
    constructor(tabClass, tabBtnClass, tabWrapperClass) {
      this.tabBtnClass = tabBtnClass;
      this.tabClass = tabClass;
      this.tabWrapperClass = tabWrapperClass
    }

    removeClass(array, className) {
      array.forEach((item, _) => {
        item.classList.remove(className);
      })
    }

    setTabHeight(activeTab, container) {
      const activeTabItem = document.querySelector(activeTab);
      const containerItem = document.querySelector(container);
      const tabHeight = activeTabItem.offsetHeight;
      containerItem.style.height = `${tabHeight}px`;
      window.locoScroll.update();
    }

    tabSwitch(tabClass, btnClass, containerClass) {
      const self = this;
      const tabBtns = document.querySelectorAll(btnClass);
      const tabs = document.querySelectorAll(tabClass);
	
      tabBtns.forEach((btn, _) => {
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          self.removeClass(tabBtns, 'active');
          self.removeClass(tabs, 'active');
          this.classList.add('active');
          const activeHref = this.getAttribute('href');
          const activeTab = document.querySelector(`[data-tab="${activeHref}"]`);
          activeTab.classList.add('active');
          self.setTabHeight(`${tabClass}.active`, containerClass)
          window.locoScroll.update();
        })
      })
    }

    init() {
      this.setTabHeight(`${this.tabClass}.active`, this.tabWrapperClass)
      this.tabSwitch(this.tabClass, this.tabBtnClass, this.tabWrapperClass)
    }
  }

  const contactsTab = new TabChange('.js-contacts-tab', '.js-contacts-tab-btn', '.js-contacts-tab-content');
  contactsTab.init();
  // const removeClass = (array, className) => {
  //   array.forEach((item, _) => {
  //     item.classList.remove(className);
  //   })
  // }

  // const setTabHeight = (activeTab, container) => {
  //   const activeTabItem = document.querySelector(activeTab);
  //   const containerItem = document.querySelector(container);
  //   const tabHeight = activeTabItem.offsetHeight;
  //   containerItem.style.height = `${tabHeight}px`;
  //   window.locoScroll.update();
  // }


  // tabSwitch = (tabClass, btnClass, containerClass) => {
  //   const tabBtns = document.querySelectorAll(btnClass);
  //   const tabs = document.querySelectorAll(tabClass);

  //   tabBtns.forEach((btn, _) => {
  //     btn.addEventListener('click', function (e) {
  //       e.preventDefault();
  //       removeClass(tabBtns, 'active');
  //       removeClass(tabs, 'active');
  //       this.classList.add('active');
  //       const activeHref = this.getAttribute('href');
  //       const activeTab = document.querySelector(`[data-tab="${activeHref}"]`);
  //       activeTab.classList.add('active');
  //       setTabHeight(`${tabClass}.active`, containerClass)
  //       window.locoScroll.update();
  //     })
  //   })
  // }

  // setTabHeight('.js-constr-single-tab.active', '.js-constr-content');

  // tabSwitch('.js-constr-single-tab', '.js-constr-tab-btn', '.js-constr-content');


  // GOOGLE MAP
  const mapStyle = [
    {
      "featureType": "all",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "saturation": 36
        },
        {
          "color": "#333333"
        },
        {
          "lightness": 40
        }
      ]
    },
    {
      "featureType": "all",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "visibility": "on"
        },
        {
          "color": "#ffffff"
        },
        {
          "lightness": 16
        }
      ]
    },
    {
      "featureType": "all",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#fefefe"
        },
        {
          "lightness": 20
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#fefefe"
        },
        {
          "lightness": 17
        },
        {
          "weight": 1.2
        }
      ]
    },
    {
      "featureType": "landscape",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f5f5"
        },
        {
          "lightness": 20
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f5f5"
        },
        {
          "lightness": 21
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dedede"
        },
        {
          "lightness": 21
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#ffffff"
        },
        {
          "lightness": 17
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#ffffff"
        },
        {
          "lightness": 29
        },
        {
          "weight": 0.2
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"
        },
        {
          "lightness": 18
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"
        },
        {
          "lightness": 16
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f2f2f2"
        },
        {
          "lightness": 19
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e9e9e9"
        },
        {
          "lightness": 17
        }
      ]
    }
  ]
  const map = new google.maps.Map(document.getElementById('map1'), {
    center: { lat: 50.461714448701464, lng: 30.496371456088845 },
    zoom: 14,
    disableDefaultUI: true,
    styles: mapStyle
  })

  new google.maps.Marker({
    position: { lat: 50.461714448701464, lng: 30.496371456088845 },
    map,
    icon: '../dist/assets/images/maps/home.svg'
  });

  const map2 = new google.maps.Map(document.getElementById('map2'), {
    center: { lat: 50.461714448701464, lng: 30.496371456088845 },
    zoom: 14,
    disableDefaultUI: true,
    styles: mapStyle
  })

  new google.maps.Marker({
    position: { lat: 50.461714448701464, lng: 30.496371456088845 },
    map: map2,
    icon: '../dist/assets/images/maps/home.svg'
  });

  const map3 = new google.maps.Map(document.getElementById('map3'), {
    center: { lat: 50.461714448701464, lng: 30.496371456088845 },
    zoom: 14,
    disableDefaultUI: true,
    styles: mapStyle
  })

  new google.maps.Marker({
    position: { lat: 50.461714448701464, lng: 30.496371456088845 },
    map: map3,
    icon: '../dist/assets/images/maps/home.svg'
  });
});
