import UIComponent from './UIComponent.js';

class PageTracker extends UIComponent {
    #labeledBy = null;
    #page = null;

    // A callback function called when changing pages.
    // The value of _n param is -1 when prev() is called & +1 when next() is called.
    #changePageCallback = _n => {};

    static #NOT_LABELED_BY_ITEMS_ERROR = new Error('you cannot call this method unless labeledBy is equal to "items"');

    constructor(changePageCallback = _n => {}, {
        labeledBy = 'items', // labeledBy: 'items' | 'pages'
        startPage = 1,
        // labeledBy === 'items':
        pageLength = 10,
        totalItems,
        // labeledBy === 'pages':
        totalPages
    }) {
        this.#labeledBy = labeledBy || 'items';

        this.#page = startPage || 1;
        this.#changePageCallback = changePageCallback;

        if (this.#labeledBy === 'pages') this.totalPages = totalPages;

        if (this.#labeledBy === 'items') {
            this.pageSize = pageLength;
            this.totalItems = totalItems;
        }

        super();
        this.createElement();
    }

    /* -------- METHODS -------- */

    // Public:

    getPage() { return this.#page; }
    
    setPage(page) {
        this.#page = page;
        this.#updateTracker();
    }
    
    prev() { this.setPage(this.#page - 1); }
    next() { this.setPage(this.#page + 1); }

    // Private:

    #getTrackerLabelRaw() {
        if (this.#labeledBy === 'items')
            return `<span>${this.#getFirstItemOnPage()}</span> - <span>${this.#getLastItemOnPage()}</span> de <span>${this.totalItems}</span>`;

        if (this.#labeledBy === 'pages')
            return `<span>${this.#page}</span> de <span>${this.totalPages}</span>`;
    }

    #updateTracker() {
        const trackerLabel = this.element.querySelector('span.page-label');
        trackerLabel.innerHTML = this.#getTrackerLabelRaw();
    }

    // Get items on page:

    #getFirstItemOnPage() {
        if (this.#labeledBy !== 'items') throw PageTracker.#NOT_LABELED_BY_ITEMS_ERROR;
        return ((this.#page - 1) * this.pageSize) + 1;
    }

    #getLastItemOnPage() {
        if (this.#labeledBy !== 'items') throw PageTracker.#NOT_LABELED_BY_ITEMS_ERROR;
        return this.#page * this.pageSize;
    }

    @Override
    createElement() {
        const pageTracker = document.createElement('nav');
        pageTracker.classList.add('page-tracker');

        const trackerLabel = this.#getTrackerLabelRaw();

        pageTracker.innerHTML = `
            <button class='back-button'>
                <i class="fa-solid fa-left-long"></i>
            </button>

            <span class="page-label">${trackerLabel}</span>

            <button class='next-button'>
                <i class="fa-solid fa-right-long"></i>
            </button>
        `;

        const backBtn = pageTracker.querySelector('.back-button');
        backBtn.addEventListener('click', () => {
            this.prev();
            this.#changePageCallback(-1);
        });

        const nextBtn = pageTracker.querySelector('.next-button');
        nextBtn.addEventListener('click', () => {
            this.next();
            this.#changePageCallback(+1);
        });

        this.element = pageTracker;
    }
}

export default PageTracker;
