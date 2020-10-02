package Round1.Problem1;

public class MidPrice 
{
    public static int calculatePrice(int midPrice, int bidPrice) 
    {   // Mid price = (ask+bid)/2 => ask = mid*2-bid 
        return midPrice*2-bidPrice;
    }    

    public static void main(String[] args)
    {
        int[] mid = new int[]{20, 1000};
        int[] bid = new int[]{19, 1};
        int[] ask = new int[]{21, 1999};
        for(int i = 0; i < mid.length; i++)
        {
            System.out.println("Test #" + (i+1)+ ": " + (ask[i] == calculatePrice(mid[i], bid[i])));
        }
    }
}
