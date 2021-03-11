const idxElem = window.location.hash.split('#')[1]
let activeTab = $(`[data-tab-filter=${idxElem}]`).index() === -1 ? 0 : $(`[data-tab-filter=${idxElem}]`).index()

const currentContent = activeTab >= 1 ? 2 : 1

document.addEventListener('click', (e) => {
  if (e.target.tagName === 'A' && $(e.target).attr('href').split('#')[1]) {
    const filterName = $(e.target).attr('href').split('#')[1]

    activeTab = $(`[data-tab-filter=${filterName}]`).index()
    $(`[data-tab-filter=${filterName}]`).trigger('click')
  }
})

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

new ProjectsTabs($('[data-content-choise]'), $('.header-tabs__single-tab-title'), 'active', currentContent)

if (activeTab > 0) {
  $(`[data-tab-filter=${idxElem}]`).trigger('click')
}
