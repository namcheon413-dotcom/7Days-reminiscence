/* ========================================
   七曜回顧錄
   AUTH MANAGER
======================================== */


/* ========================================
   GET SESSION
======================================== */

async function getCurrentSession() {

  const {
    data,
    error
  } =
    await window.supabaseClient
      .auth
      .getSession();


  if (error) {

    console.error(
      "[AUTH] Session error:",
      error
    );

    throw error;
  }


  return data.session;
}


/* ========================================
   CREATE ANONYMOUS USER
======================================== */

async function createAnonymousUser() {

  const {
    data,
    error
  } =
    await window.supabaseClient
      .auth
      .signInAnonymously();


  if (error) {

    console.error(
      "[AUTH] Anonymous sign-in failed:",
      error
    );

    throw error;
  }


  if (!data.user) {

    throw new Error(
      "[AUTH] User was not created."
    );
  }


  console.log(
    "[AUTH] New anonymous user:",
    data.user.id
  );


  return data.user;
}


/* ========================================
   GET OR CREATE USER
======================================== */

async function getOrCreateUser() {

  const session =
    await getCurrentSession();


  if (session?.user) {

    console.log(
      "[AUTH] Existing user:",
      session.user.id
    );


    return {
      user: session.user,
      isNew: false
    };
  }


  const user =
    await createAnonymousUser();


  return {
    user: user,
    isNew: true
  };
}


/* ========================================
   TEST
======================================== */

async function testAuthentication() {

  try {

    const result =
      await getOrCreateUser();


    console.log(
      "================================"
    );

    console.log(
      "[AUTH TEST]"
    );

    console.log(
      "USER ID:",
      result.user.id
    );

    console.log(
      "NEW USER:",
      result.isNew
    );

    console.log(
      "================================"
    );


    return result;

  } catch (error) {

    console.error(
      "[AUTH TEST FAILED]",
      error
    );

    return null;
  }
}


/* ========================================
   GLOBAL ACCESS
======================================== */

window.GameAuth = {
  getCurrentSession,
  createAnonymousUser,
  getOrCreateUser,
  testAuthentication
};
