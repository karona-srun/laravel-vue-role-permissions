<template>
    <Row>
        <Col span="12">
            <Select
                v-model="model20"
                multiple
                filterable
                :remote-method="remoteMethod4"
                :default-label="['北京', '深圳']"
                :loading="loading4"
                @on-set-default-options="setDefaultOptions"
            >
                <Option v-for="(option, index) in list2" :value="option.value" :key="index">{{option.label}}</Option>
            </Select>
        </Col>
    </Row>
</template>
<script>
    export default {
        data () {
            return {
                model20: [],
                options4: [],
                loading4: false,
                list2: [
                    {
                        value: 'beijing',
                        label: '北京'
                    },
                    {
                        value: 'shanghai',
                        label: '上海'
                    },
                    {
                        value: 'shenzhen',
                        label: '深圳'
                    },
                    {
                        value: 'hangzhou',
                        label: '杭州'
                    },
                    {
                        value: 'guangzhou',
                        label: '广州'
                    }
                ],
            };
        },
        methods: {
            remoteMethod4 (query) {
                if (query !== '') {
                    this.loading4 = true;
                    setTimeout(() => {
                        this.loading4 = false;
                        this.options4 = this.list2.filter(item => item.label.indexOf(query) > -1);
                    }, 200);
                } else {
                    this.options4 = [];
                }
            },
            setDefaultOptions (options) {
                this.options4 = options;
            }
        }
    };
</script>
