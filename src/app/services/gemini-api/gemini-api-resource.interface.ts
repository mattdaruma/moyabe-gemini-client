export interface ApiResource {
    name: string,
    display: string,
    methods: string[],
    parent?: ApiResource
}