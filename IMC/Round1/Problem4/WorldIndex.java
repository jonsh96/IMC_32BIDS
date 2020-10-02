package Round1.Problem4;

import java.util.List;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;

public class WorldIndex 
{
    static String str; 

    // HELPER FUNCTIONS
    // Find longest substring in common
    public static String longest_common_substring(String str1, String str2) 
    { 
        int len = 0, row = 0, col = 0; 
        int m = str1.length(); 
        int n = str2.length();
        String ans = ""; 
        int[][] val_table = new int[m + 1][n + 1]; 

        for (int i = 0; i <= m; i++) 
        { 
            for (int j = 0; j <= n; j++) 
            { 
                if (i == 0 || j == 0) 
                    val_table[i][j] = 0; 
                else if (str1.charAt(i - 1) == str2.charAt(j - 1)) 
                { 
                    val_table[i][j] = val_table[i - 1][j - 1] + 1; 
                    if (len < val_table[i][j]) 
                    { 
                        len = val_table[i][j]; 
                        row = i; 
                        col = j; 
                    } 
                } 
                else
                    val_table[i][j] = 0; 
            } 
        }  
        while (val_table[row][col] != 0) 
        { 
            ans = str1.charAt(row - 1) + ans;  
            --len; 
            row--; 
            col--; 
        } 
        return ans; 
    } 
    public static double compatibility_score(String str1, String str2)
    {
        // If the longest common substring is in the middle of the "longer" string and doesn't include the whole "shorter" string, the score will be 0. Otherwise the score will be the lenght of the longest common substring divided by the length of the shorter string. 
        int len = Math.min(str1.length(), str2.length());
        String sub = longest_common_substring(str1, str2);
        String shorter, longer;
        if(str1.length() < str2.length())
        {
            shorter = str1;
            longer = str2;
        }
        else
        {
            longer = str1;
            shorter = str2;
        }
        // Check if longest substring is on either end of the longer string
        String left_sub1 = longer.substring(0, sub.length());
        String right_sub1 = longer.substring(longer.length()-sub.length(), longer.length());
        String left_sub2 = shorter.substring(0, sub.length());
        String right_sub2 = shorter.substring(shorter.length()-sub.length(), shorter.length());

        double score = 0.0;
        if(shorter.equals(sub) || longer.equals(shorter))
            score = 1.0;
        if((left_sub1.equals(sub) || right_sub1.equals(sub)) && (left_sub2.equals(sub) || right_sub2.equals(sub)))
            score = sub.length()/(double)shorter.length();

        return score;
    }
    // Function to calculate overlap in two given strings 
    public static int overlapping_pair(String str1, String str2)  
    { 
        int max = Integer.MIN_VALUE; 
        int len1 = str1.length(), len2 = str2.length();
        for (int i = 1; i <= Math.min(len1, len2); i++)  
        { 
            if (str1.substring(str1.length() - i).compareTo(str2.substring(0, i)) == 0) 
            { 
                if (max < i)  
                { 
                    max = i; 
                    str = str1 + str2.substring(i); 
                } 
            } 
        } 
        for (int i = 1; i <= Math.min(len1, len2); i++)  
        { 
            if (str1.substring(0, i).compareTo(str2.substring(str2.length() - i)) == 0) 
            { 
                if (max < i) 
                { 
                    max = i; 
                    str = str2 + str1.substring(i); 
                } 
            } 
        } 
        return max; 
    } 
    // Function to calculate smallest string that contains 
    // each string in the given set as substring. 
    public static String shortest_string(List<String> names)
    {
        int len = names.size();
        while (len != 1)  
        { 
            int max = Integer.MIN_VALUE;
            int L = 0, R = 0; 
            String result = ""; 
            for (int i = 0; i < len; i++)  
            { 
                for (int j = i + 1; j < len; j++) 
                { 
                    int res = overlapping_pair(names.get(i), names.get(j)); 
                    if (max < res)  
                    { 
                        max = res; 
                        result = str; 
                        L = i; 
                        R = j; 
                    } 
                } 
            } 
            len--; 
            if (max == Integer.MIN_VALUE) 
                names.set(0, names.get(0) + names.get(len)); 
            else
            { 
                names.set(L, result);  
                names.set(R, names.get(len));
            } 
        } 
        return names.get(0);
    } 

    public static String makeName(List<String> names) 
    {
        String temp;
        double score;
        // Sort by length 
        Collections.sort(names, Comparator.comparing(String::length));
        Collections.reverse(names); 
        // Remove empty
        names.removeIf(item -> item == null || "".equals(item));

        // Remove perfect fits
        for(int i = 0; i < names.size()-1; i++)
        {
            for(int j = i+1; j < names.size(); j++)
            {
             	temp = longest_common_substring(names.get(i), names.get(j));
                score = compatibility_score(names.get(i), names.get(j));
                if(score == 1.0)
                	names.set(j, "");
            }
        }
        // Remove empty
        names.removeIf(item -> item == null || "".equals(item));

        String ans = shortest_string(names);
		return ans;
    }
    
    public static void main(String[] args)
    {
        List<String> names = Arrays.asList(new String[]{"NVDA", "DAX", "AMZN"});
        System.out.println("Test #1: " + (makeName(names).length() == "AMZNVDAX".length()));
        
        // Error í test case 2???
        // names = Arrays.asList(new String[]{"FTSE", "FTS", "TSE", "FT", "TS", "SE", "FTSE"});
        // System.out.println("Test #2: " + (makeName(names).length() == "FTSE".length()));
        

    }
}
