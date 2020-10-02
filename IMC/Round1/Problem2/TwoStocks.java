package Round1.Problem2;

import java.util.Arrays;
import java.util.List;

public class TwoStocks 
{
    public static int calculateProfit(List<Integer> firstStockPrices, List<Integer> secondStockPrices) 
    {
        int profit = 0;
        if(firstStockPrices.size() > 1)
        {
            for(int i = 1; i < firstStockPrices.size(); i++)
            {
                profit += Math.max(0,Math.max(firstStockPrices.get(i)-firstStockPrices.get(i-1), secondStockPrices.get(i)-secondStockPrices.get(i-1)));
            }
        }
        return profit;
    }

    public static void main(String[] args)
    {
        // Test 1
        List<Integer> st1 = Arrays.asList(new Integer[]{1, 2});
        List<Integer> st2 = Arrays.asList(new Integer[]{5, 8});
        System.out.println("Test #1: " + (calculateProfit(st1, st2)==3));

        // Test 2
        st1 = Arrays.asList(new Integer[]{2, 11, 7});
        st2 = Arrays.asList(new Integer[]{3, 6, 3});
        System.out.println("Test #2: " + (calculateProfit(st1, st2)==9));

        // Test 3
        st1 = Arrays.asList(new Integer[]{2, 9, 5, 8});
        st2 = Arrays.asList(new Integer[]{9, 6, 5, 4});
        System.out.println("Test #3: " + (calculateProfit(st1, st2)==10));
        
        // Test 4
        st1 = Arrays.asList(new Integer[]{3});
        st2 = Arrays.asList(new Integer[]{2});
        System.out.println("Test #4: " + (calculateProfit(st1, st2)==0));
        
        // Test 5
        st1 = Arrays.asList(new Integer[]{1, 10, 7, 11, 4, 28});
        st2 = Arrays.asList(new Integer[]{2, 5, 4, 12, 13, 12});
        System.out.println("Test #5: " + (calculateProfit(st1, st2)==42));
    }

}
