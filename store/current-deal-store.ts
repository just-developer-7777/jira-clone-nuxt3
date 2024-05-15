import type { IDeal } from "~/types";

const initialState: {deal: IDeal | null; isOpen: boolean} = {
    deal: null,
    isOpen: false
}

export const useCurrentDealStore = defineStore('current-deal', {
    state: () =>  initialState,
    actions: {
        set(deal: IDeal) {
            this.$patch({deal, isOpen: true})
            // console.log(this.isOpen);
        },
        clear(){
            this.$patch(initialState)
        },
        toggle(){
            this.isOpen = !this.isOpen
        } 
    }
})