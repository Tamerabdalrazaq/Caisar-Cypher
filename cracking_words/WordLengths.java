
/**
 * Write a description of WordLengths here.
 * 
 * @author (your name) 
 * @version (a version number or a date)
 */

import edu.duke.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.Arrays;

public class WordLengths {
    
    public void countWordLengths( FileResource resource, int [] counts ){
        Pattern pattern = Pattern.compile("[\\w'-]+"); // \w+ missed embark'd
        Arrays.fill(counts,0);
        for(String s : resource.words() ){
            Matcher matcher = pattern.matcher(s);
            if( matcher.find() ){
                int len = matcher.group().length();
                if( len >= counts.length ){
                    counts[counts.length-1]++;
                } else {
                    counts[len]++;
                }
            }
        }
    }

    public int indexOfMax( int [ ] values){
        int max = 0;
        int maxInd = 0;
        for( int k=0; k < values.length; k++ ){
            if( values[k] > max ){
                max = values[k];
                maxInd = k;
            }
        }
        return maxInd;        
    }
    
    public void testCountWordLengths(){
        int [] counts = new int[31];
        //FileResource resource = new FileResource( "smallHamlet.txt");
        //FileResource resource = new FileResource( "hamlet.txt");
        FileResource resource = new FileResource( "lotsOfWords.txt");
        countWordLengths( resource, counts );
        for( int k=0; k<counts.length; k++ ){
            System.out.println( counts[k] + " word(s) of length " + k );
        }
        
        System.out.println("Most common word length : " + indexOfMax(counts));
    }
    
}
