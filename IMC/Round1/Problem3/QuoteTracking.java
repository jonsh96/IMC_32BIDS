package Round1.Problem3;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class QuoteTracking 
{
    // Helper functions
    public static boolean isPrime(int n) 
    { 	// Checks whether a given input is a prime number
        if (n <= 1) 
            return false; 
        for (int i = 2; i < n; i++) 
            if (n % i == 0) 
                return false;   
        return true; 
    } 

    public static List<Integer> prime_nums(int n)
    {	// Returns a list of all primes less than 50
        List<Integer> primes = new ArrayList<Integer>();
        for (int i = 2; i <= n; i++)  
            if (isPrime(i)) 
                primes.add(i);
        return primes;
    }

    public static boolean is_super_prime(int n, int p)
    {	// Checks whether numbers divide perfectly
        // I.e. is n made up purely from p? e.g. n = p^2, n = p^3 etc
        double x = Math.log(n)/Math.log(p);
        if(x == Math.round(x))
            return true;    
        return false;
    }

    public static int countTraders(List<Integer> volumes) 
    {	// Counts traders
        int traders = 0; 
        List<Integer> primes = prime_nums(50);
        List<Integer> contenders = new ArrayList<Integer>();
        Set<Integer> unique_primes = new HashSet<Integer>();
        for(int i = 0; i < volumes.size(); i++)
            for(int j = 0; j < primes.size(); j++)
                if(volumes.get(i) % primes.get(j) == 0)
                    unique_primes.add(primes.get(j));

        contenders.addAll(unique_primes);
        for(int i = 0; i < volumes.size(); i++)
            for(int j = 0; j < contenders.size(); j++)
                if(contenders.get(j) <= volumes.get(i) && contenders.get(j) > 0)
                    if(is_super_prime(volumes.get(i), contenders.get(j)))
                    {
                        traders++;
                        contenders.set(j, 0);
                    }
        return traders;
    }

    public static void main(String[] args)
    {
        // Test 1
        List<Integer> volumes = Arrays.asList(new Integer[]{4, 8}); 
        System.out.println("Test #1: " + (countTraders(volumes) == 1));

        // Test 2
        volumes = Arrays.asList(new Integer[]{2, 3});
        System.out.println("Test #2: " + (countTraders(volumes) == 2));
        
        // Test 3
        volumes = Arrays.asList(new Integer[]{30, 10, 9, 8, 6});
        System.out.println("Test #3: " + (countTraders(volumes) == 2));
        
        // Test 4
        volumes = Arrays.asList(new Integer[]{2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12});
        System.out.println("Test #4: " + (countTraders(volumes) == 5));
        
        // Test 5
        volumes = Arrays.asList(new Integer[]{6, 10, 15, 24, 30, 50});
        System.out.println("Test #5: " + (countTraders(volumes) == 2));
        System.out.println(countTraders(volumes));
    }    
}
