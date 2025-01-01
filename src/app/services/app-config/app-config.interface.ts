export interface AppConfig{
    serviceEmdpoint: string,
    versionName: string,
    versionDisplay: string,
    resources: ConfigResource[]
}

export interface ConfigResource{
    name: string,
    display: string,
    methods: string[],
    children?: ConfigResource[]
}