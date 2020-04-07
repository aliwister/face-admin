import React, { useContext, lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import {
  LOGIN,
  PRODUCTS,
  CATEGORY,
  DASHBOARD,
  ORDERS,
  SETTINGS,
  CUSTOMERS,
  COUPONS,
  STUFF_MEMBERS,
  SITE_SETTINGS, ORDERDETAILS, PURCHASES, PURCHASEDETAILS, CART, SIGNUP, SHIPMENTS,SHIPMENTDETAILS
} from "./settings/constants";
import AuthProvider, { AuthContext } from "./context/auth";
import { InLineLoader } from "./components/InlineLoader/InlineLoader";
import ShipmentDetails from "./containers/Shipments/ShipmentDetails";
const PurchaseDetails = lazy(() => import(  "./containers/Purchases/PurchaseDetails"));
const Purchases = lazy(() => import(  "./containers/Purchases/Purchases"));
const Shipments = lazy(() => import(  "./containers/Shipments/Shipments"));
const Products = lazy(() => import("./containers/Products/Products"));
const Cart = lazy(() => import("./containers/Cart/Cart"));
const AdminLayout = lazy(() => import("./containers/Layout/Layout"));
const Dashboard = lazy(() => import("./containers/Dashboard/Dashboard"));
const Category = lazy(() => import("./containers/Category/Category"));
const Orders = lazy(() => import("./containers/Orders/Orders"));
const OrderDetails = lazy(() => import("./containers/Orders/OrderDetails"));
const Settings = lazy(() => import("./containers/Settings/Settings"));
const SiteSettingForm = lazy(() =>
  import("./containers/SiteSettingForm/SiteSettingForm")
);
const StaffMembers = lazy(() =>
  import("./containers/StaffMembers/StaffMembers")
);
const Customers = lazy(() => import("./containers/Customers/Customers"));
const Coupons = lazy(() => import("./containers/Coupons/Coupons"));
const Login = lazy(() => import("./containers/Login/Login"));
const NotFound = lazy(() => import("./containers/NotFound/NotFound"));
const Signup = lazy(() => import("./containers/Signup/Signup"));

/**
 *
 *  A wrapper for <Route> that redirects to the login
 * screen if you're not yet authenticated.
 *
 */

function PrivateRoute({ children, ...rest }) {
  const { isAuthenticated, isAdmin, isMerchant } = useContext(AuthContext);
  console.log('in private route:',isAuthenticated);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function EmployeeRoute({ children, ...rest }) {
  const { isAuthenticated, isAdmin, isMerchant  } = useContext(AuthContext);
  console.log('in private route:',isAuthenticated);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated && isAdmin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function MerchantRoute({ children, ...rest }) {
  const { isAuthenticated, isAdmin, isMerchant  } = useContext(AuthContext);
  console.log('in private route:',isAuthenticated);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated && isMerchant? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

const Routes = () => {
  return (
    <AuthProvider>
      <Suspense fallback={<InLineLoader />}>
        <Switch>
          <PrivateRoute exact={true} path={DASHBOARD}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <Dashboard />
              </Suspense>
            </AdminLayout>
          </PrivateRoute>
          <MerchantRoute path={PRODUCTS}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <Products />
              </Suspense>
            </AdminLayout>
          </MerchantRoute>
          <PrivateRoute path={CATEGORY}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <Category />
              </Suspense>
            </AdminLayout>
          </PrivateRoute>
          <EmployeeRoute path={ORDERS}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <Orders />
              </Suspense>
            </AdminLayout>
          </EmployeeRoute>
          <PrivateRoute path={ORDERDETAILS}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <OrderDetails />
              </Suspense>
            </AdminLayout>
          </PrivateRoute>
          <EmployeeRoute path={PURCHASES}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <Purchases />
              </Suspense>
            </AdminLayout>
          </EmployeeRoute>
          <EmployeeRoute path={PURCHASEDETAILS}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <PurchaseDetails />
              </Suspense>
            </AdminLayout>
          </EmployeeRoute>
          <EmployeeRoute path={SHIPMENTS}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <Shipments />
              </Suspense>
            </AdminLayout>
          </EmployeeRoute>
          <PrivateRoute path={SHIPMENTDETAILS}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <ShipmentDetails />
              </Suspense>
            </AdminLayout>
          </PrivateRoute>
          <EmployeeRoute path={CUSTOMERS}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <Customers />
              </Suspense>
            </AdminLayout>
          </EmployeeRoute>
          <EmployeeRoute path={COUPONS}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <Coupons />
              </Suspense>
            </AdminLayout>
          </EmployeeRoute>
          <PrivateRoute path={CART}>
            <EmployeeRoute>
              <Suspense fallback={<InLineLoader />}>
                <Cart />
              </Suspense>
            </EmployeeRoute>
          </PrivateRoute>
          <EmployeeRoute path={SETTINGS}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <Settings />
              </Suspense>
            </AdminLayout>
          </EmployeeRoute>
          <EmployeeRoute path={STUFF_MEMBERS}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <StaffMembers />
              </Suspense>
            </AdminLayout>
          </EmployeeRoute>
          <EmployeeRoute path={SITE_SETTINGS}>
            <AdminLayout>
              <Suspense fallback={<InLineLoader />}>
                <SiteSettingForm />
              </Suspense>
            </AdminLayout>
          </EmployeeRoute>
          <Route path={LOGIN}>
            <Login />
          </Route>
          <Route path={SIGNUP}>
            <Signup />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </AuthProvider>
  );
};

export default Routes;
