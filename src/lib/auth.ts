import { supabase } from "@/db/supabase";

export async function getCurrentUser() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      throw error;
    }
    
    if (!session) {
      return null;
    }
    
    const { data: user, error: userError } = await supabase.auth.getUser();
    
    if (userError) {
      throw userError;
    }
    
    return user.user;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error("Error signing out:", error);
    return false;
  }
}
