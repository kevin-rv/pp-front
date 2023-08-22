<template>
  <div class="container w-25 h-100 ps-0" style=" position: fixed ;display: flex;align-items: center; z-index: -1">
    <sidebar/>
  </div>
  <OffCanvas
      close-button-class="btn btn-outline-secondary bi-chevron-bar-left"
      off-canvas-id="sidebar"
      off-canvas-title="Menu"
      :backdrop="false"
  >
    <template v-slot:default>
      <ul class="list-unstyled ps-0">
        <li class="mb-1">
          <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
            Dashboard
          </button>
          <div class="collapse" id="dashboard-collapse">
            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li><a href="#" class="link-dark rounded">planning 1</a></li>
              <li><a href="#" class="link-dark rounded">planning 2</a></li>
              <li><a href="#" class="link-dark rounded">planning 3</a></li>
            </ul>
          </div>
        </li>
        <li class="mb-1">
          <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
            Contact
          </button>
          <div class="collapse" id="orders-collapse">
            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li><a href="#" class="link-dark rounded">New</a></li>
              <li><a href="#" class="link-dark rounded">Processed</a></li>
              <li><a href="#" class="link-dark rounded">Shipped</a></li>
              <li><a href="#" class="link-dark rounded">Returned</a></li>
            </ul>œ
          </div>
        </li>
        <li @click="$router.push('account')" class="mb-1">
          <button class="btn btn-sidebar align-items-center rounded ps-4">
            Account
          </button>
        </li>
        <li class="border-top my-3"></li>
        <li class="mb-1">
          <button class="btn btn-sidebar align-items-center rounded ps-4">
            Déconnexion
          </button>
        </li>
      </ul>
    </template>
  </OffCanvas>
</template>

<script>
import OffCanvas from "/src/components/sidebar/OffCanvas";
import Sidebar from "/src/components/sidebar/sidebar";
export default {
  name: "SideBar2",
  components: {Sidebar, OffCanvas}
}
</script>

<style scoped>
.bi {
  vertical-align: -.125em;
  pointer-events: none;
  fill: currentColor;
}

.dropdown-toggle { outline: 0; }

.nav-flush .nav-link {
  border-radius: 0;
}

.btn-toggle {
  display: inline-flex;
  align-items: center;
  padding: .25rem .5rem;
  font-weight: 600;
  color: rgba(0, 0, 0, .65);
  background-color: transparent;
  border: 0;
}
.btn-toggle:hover,
.btn-toggle:focus {
  color: rgba(0, 0, 0, .85);
  background-color: #d2f4ea;
}

.btn-toggle::before {
  width: 1.25em;
  line-height: 0;
  content: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='rgba%280,0,0,.5%29' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 14l6-6-6-6'/%3e%3c/svg%3e");
  transition: transform .35s ease;
  transform-origin: .5em 50%;
}

.btn-toggle[aria-expanded="true"] {
  color: rgba(0, 0, 0, .85);
}
.btn-toggle[aria-expanded="true"]::before {
  transform: rotate(90deg);
}

.btn-toggle-nav a {
  display: inline-flex;
  padding: .1875rem .5rem;
  margin-top: .125rem;
  margin-left: 1.25rem;
  text-decoration: none;
}
.btn-toggle-nav a:hover,
.btn-toggle-nav a:focus {
  background-color: #d2f4ea;
}

.fw-semibold { font-weight: 600; }

</style>
