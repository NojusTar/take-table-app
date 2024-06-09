import { supabase } from "@/utils/supabase";
import { Session } from "@supabase/supabase-js";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext({
  session: null,
  user: null,
  loading: true,
});

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<any>(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const fetchUser = async () => {
      const { data } = await supabase.auth.getSession();

      setSession(data.session);

      setLoading(false);
    };

    fetchUser();

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ session, loading, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
