<template>
  <div>
    <Row :style="{
            padding: '10px 20px',
            background: '#fff',
          }">
      <Col span="8">
        <h6>Dashboard</h6>
      </Col>
      <br>
      </Row>
    <Row :style="{
            padding: '10px 20px',
            background: '#fff',
          }">
      <Col :style="{
            padding: '10px',
          }">
        <Card>
            <div style="text-align:center">
                <img src="">
                <h3>0</h3>
                <p>Users Management</p>
                <Button type="info" to="users">More Information</Button>
            </div>
        </Card>
      </Col>
      <Col :style="{
            padding: '10px',
          }">
        <Card>
            <div style="text-align:center">
                <img src="">
                <h3>0</h3>
                <p>Roles Management</p>
                <Button type="info" to="roles">More Information</Button>
            </div>
        </Card>
      </Col>
    </Row>
        
  </div>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  methods: {},
};
</script>
