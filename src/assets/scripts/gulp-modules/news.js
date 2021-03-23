new SetCountPortion('.projects__item', null, 5)

class ProjectsTabs extends Tabs {
  constructor(content, tabs, activeClass, firstShow) {
    super(content, tabs, activeClass, firstShow)
  }

  onTabChange(activeTab) {
    if (activeTab.data().tabFilter) {
      const filterName = activeTab.data().tabFilter
            
      $(`[data-filter]`).each(function () {
        $(this).data().filter === filterName ? $(this).fadeIn(200) : $(this).hide()
      })
      new VacancyProgress($(`[data-filter=${filterName}]`))
    }

    window.locoScroll.update()
  }

  trigger() {
    super.trigger(this.onTabChange, activeTab)
  }
}

new ProjectsTabs($('[data-content-choise]'), $('.header-tabs__single-tab-title'), 'current')
