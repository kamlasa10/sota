@@include('../modules/vacancy/vacancyLoadingLogic.js')

class ProjectsTabs extends Tabs {
    constructor(content, tabs, activeClass) {
        super(content, tabs, activeClass)
    }

    onTabChange(activeTab) {
        if(activeTab.data().tabFilter) {
            const filterName = activeTab.data().tabFilter
            
            $(`[data-filter]`).each(function() {
                $(this).data().filter === filterName ? $(this).fadeIn(200) : $(this).hide()
            })
            new VacancyProgress($(`[data-filter=${filterName}]`))
        }

        window.locoScroll.update()
    }

    trigger() {
        super.trigger(this.onTabChange)
    }
}

new ProjectsTabs($('[data-content-choise]'), $('.header-tabs__single-tab-title'), 'active')
