import UIComponent from './UIComponent.js';

class TabsMenu extends UIComponent {
    #target = null;
    #items = [
        // Example Item:
        {
            id: 'sample',
            label: 'Tab Text',
            faIcon: 'fa-user',
            notify: false, // default
            path: '/path/to/fetch.html',
            action: () => console.log('Action...')
        }
    ];
    #storageKey = null;
    #options = {
        menuClass: 'items-list',
        itemClass: 'items-list__item',
        selectedClass: 'items-list__item--selected',
        iconClass: 'fa-solid',
        notifyClass: 'item__notify',
        notifyActiveClass: 'item__notify--active',
        frameClass: 'item__frame',
    };

    #selectedItem = null;
    #loadedRawsMap = {};
    #itemsMap = {};

    constructor({ target, items = [], defaultItem, storageKey = null, options = {} } = {}) {
        this.#target = target;

        this.#items = items;
        this.#validateDuplicateItems();
        // Format: { [id]: { label, faIcon, notify, path, action } }
        this.#itemsMap = this.#items.reduce((acc, { id, ...rest }) => ({ ...acc, [id]: rest }), {});

        if (defaultItem) this.#validateItemId(defaultItem);
        if (storageKey) this.#registerStorageKey(storageKey);

        this.#options = options;

        // selectedItem
        this.#selectedItem = sessionStorage.get(storageKey) || defaultItem || this.#items[0].id;

        // Format: { [id]: ITEM_HTML_RAW }
        this.#loadedRawsMap = this.#items.reduce((acc, { id }) => ({ ...acc, [id]: null }), {});
        
        // Final setup
        super();
        this.createElement();

        this.redirect(this.#selectItem);
    }

    #registerStorageKey(storageKey) {
        if (sessionStorage.getItem(storageKey))
            throw new Error(`storageKey "${storageKey}" already exists`);

        this.#storageKey = storageKey;
        sessionStorage.setItem(this.#storageKey, this.#selectedItem);
    }

    /* -------- Validators -------- */

    #validateDuplicateItems() {
        const hasDuplicateItems = this.#items
            .map(({ id }) => id)
            .some((id, i, arr) => arr.indexOf(id) !== i);

        if (hasDuplicateItems) throw new Error('there cannot be items with the same id');
    }

    #validateItemId(itemId) {
        if (!itemId) throw new Error(`item id "${itemId}" is not defined`);
        if (!this.#itemsMap[itemId]) throw new Error(`item id "${itemId}" does not exists`);
    }
    
    /* -------- Methods -------- */
    // Getters:
    getTarget() { return this.#target; }
    getItems() { return this.#items; }
    getSelectedItem() { return this.#selectedItem; }

    // Redirect tab selected to an item.
    async redirect(itemId) {
        this.#validateItemId(itemId);
        this.#selectItem(itemId);

        await this.#loadItemHTML(itemId);
        await this.#callItemAction(itemId);
    }

    #selectItem(itemId) {
        this.#validateItemId(itemId);
        this.#selectedItem = itemId;

        if (this.#storageKey) sessionStorage.setItem(this.#storageKey, this.#selectedItem);

        const { menuClass, itemClass, selectedClass } = this.#options;
        const tabs = this.element.querySelectorAll(`ul.${menuClass} .${itemClass}`);

        tabs.forEach(tab => {
            const tabIsSelected = this.#getTabId(tab) === this.#selectedItem;

            tab.classList.toggle(selectedClass, tabIsSelected);
            tab.setAttribute('aria-selected', tabIsSelected.toString());
        });
    }

    #getTabId(tab) {
        // The last class is always the item id or "selected" class.

        const classes = tab.className.split(' ');
        const lastClass = classes.at(-1);

        if (lastClass === this.#options.selectedClass) {
            this.#validateItemId(classes.at(-2));
            return classes.at(-2);
        }
        
        this.#validateItemId(lastClass);
        return lastClass;
    }

    // Gera o HTML (caso exista) no target.
    async #loadItemHTML(itemId) {
        this.#validateItemId(itemId);

        if (!this.#itemsMap[itemId]?.path) return;

        const preLoadedRaw = this.#loadedRawsMap[itemId];
        if (preLoadedRaw) {
            this.#target.innerHTML = preLoadedRaw;
            return;
        }
        
        try {
            const res = await fetch(this.#itemsMap[itemId].path);
            const rawToRender = await res.text();
            this.#loadedRawsMap[itemId] = rawToRender;
            this.#target.innerHTML = rawToRender;

            return;
        } catch (e) { throw e; }
    }

    // Executa o script (caso exista).
    async #callItemAction(itemId) {
        this.#validateItemId(itemId);

        if (!this.#itemsMap[itemId]?.action) return;

        try { await this.#itemsMap[itemId].action?.(); }
        catch (e) { throw new Error(`failed to executing action for ${itemId}:`, e); }
    }
    
    @Override
    createElement() {
        const { menuClass } = this.#options;

        const menuBar = document.createElement('nav');
        menuBar.classList.add('tabs-menu');

        const itemIds = Object.keys(this.#itemsMap); // Reescrever
        const tabsRaw = itemIds.map(id => this.#getItemRaw(id)).join('');

        menuBar.innerHTML = `<ul role="tablist" class="${menuClass}">${tabsRaw}</ul>`;
        this.#attachRedirectInTabs(menuBar);

        this.element = menuBar;
    }

    #getItemRaw(itemId) {
        this.#validateItemId(itemId);

        const { itemClass, iconClass, notifyClass, notifyActiveClass, frameClass } = this.#options;

        const { label, faIcon, notify } = this.#itemsMap[itemId];

        const notifyElementClasses = [notifyClass, (notify ? notifyActiveClass : '')];
        const notifyElement = notify ? `<span class="${notifyElementClasses.join(' ')}"></span>` : ''

        const faIconFrame = faIcon ? `
            <div class="${frameClass}">
                <i class="${iconClass} ${faIcon}"></i>
            </div>
        ` : '';

        return `
            <li role="tab" class="${itemClass} ${itemId}" tabindex="0" aria-selected="false">
                ${notifyElement}
                ${faIconFrame}
                <span>${label}</span>
            </li>
        `;
    }

    #attachRedirectInTabs(menuElement) {
        const { menuClass, itemClass } = this.#options;
        const tabs = menuElement.querySelectorAll(`ul.${menuClass} .${itemClass}`);

        tabs.forEach(tab => {
            tab.addEventListener('click', async () => {
                const itemId = this.#getTabId(tab);
                await this.redirect(itemId);
            });
        });
    }
}

export default TabsMenu;
